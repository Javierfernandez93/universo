<?php define("TO_ROOT", "../../");

require_once TO_ROOT . "system/core.php"; 

$data = HCStudio\Util::getHeadersForWebService();

$UserLogin = new Site\UserLogin;

if($UserLogin->logged === true)
{
    $intents = Site\Intent::getIntents($data['message']);

    if($tag = predict($intents,$data['message']))
    {
        $CatalogTagIntent = new Site\CatalogTagIntent;

        $data['catalog_tag_intent_id'] = $CatalogTagIntent->getCatalogTagIntentIdByTag($tag['tag']);
        
        if($CatalogTagIntent->hasResponse($data['catalog_tag_intent_id']))
        {
			$balance = 0;

			if($Wallet = BlockChain\Wallet::getWallet($UserLogin->company_id))
			{
				$balance = $Wallet->getBalance();
			}

			$systemVariables = (new Site\SystemVar)->getAllPair();
			$userVars = [
				'names' => $UserLogin->_data['user_data']['names'],
				'balance' => number_format($balance,2),
				'landing' => HCStudio\Connection::getMainPath()."/".$UserLogin->getReferralLanding(),
			];

			$vars = array_merge($userVars,$systemVariables);

            $data['response'] = nl2br(Site\Parser::doParser(getMLReplay($tag['tag'],$data['catalog_tag_intent_id']),$vars));
        }

		$data['tag'] = $tag['tag'];
        $data['r'] = "DATA_OK";
        $data['s'] = 1;
    } else {
		$data['response'] = 'No tenemos una respuesta para esto. Puedes contactarte con nuestros asesores en <a href="https://www.zuum.link/VG02FH"></a>';
        $data['r'] = "DATA_OK";
        $data['s'] = 1;
	}

    $data['r'] = 'DATA_OK';
    $data['s'] = 1;
} else {
	$data['r'] = 'INVALID_CREDENTIALS';
	$data['s'] = 0;
}

function isSingleData(array $data = null) 
{
	return sizeOf(array_unique(array_column($data,"tag"))) <= 2;
} 

function predict(array $data = null, string $sentence = null) 
{
    require_once TO_ROOT . '/vendor/autoload.php';

	if(isSingleData($data) === true)
	{
		return [
			"tag" => $data[0]['tag'],
			"probability" => 100
		];
	} else {
		$data = array_values($data);

		$classifier = new Phpml\Classification\SVC(
		    Phpml\SupportVectorMachine\Kernel::LINEAR, // $kernel
		    1.0,            // $cost
		    3,              // $degree
		    null,           // $gamma
		    0.0,            // $coef0
		    0.001,          // $tolerance
		    100,            // $cacheSize
		    true,           // $shrinking
		    true            // $probabilityEstimates, set to true
		);

		$ML = new JFStudio\ML;

		$samples = $ML->getTargetsByBD($data);
		$targets = $ML->getSamplesByBD($data);

		$vectorizer = new Phpml\FeatureExtraction\TokenCountVectorizer(new Phpml\Tokenization\WordTokenizer);
		$tfIdfTransformer = new Phpml\FeatureExtraction\TfIdfTransformer;

		$vectorizer->fit($samples);
		$vectorizer->transform($samples);

		$tfIdfTransformer->fit($samples);
		$tfIdfTransformer->transform($samples);

		$dataset = new Phpml\Dataset\ArrayDataset($samples, $targets);

		$ML->setValues($ML->convertValues($dataset->getSamples()));
		$ML->setVocabulary($vectorizer->getVocabulary());
    
		$classifier->train($samples, $targets);

		if($samples = $ML->getSamples($sentence))
		{
			if($tag = $classifier->predict($samples))
			{
				if($probabilities = $classifier->predictProbability($samples))
				{
					if($probability = $probabilities[$tag])
					{
						$probability *= 100;
						
						if($probability > 9)
						{
							return [
								"tag" => $tag,
								"probabilities" => $probabilities
							];
						}
					}
				}
			}
		}
	}

	return false;
}

function getMLReplay(string $tag = null,$catalog_tag_intent_id = null) : string
{
	if(isset($tag,$catalog_tag_intent_id) === true)
	{
		return Site\ReplyPerCatalogTagIntent::getReplyRandom($catalog_tag_intent_id);
	}

	return Site\ReplyPerCatalogTagIntent::getDefaultReply();
}

echo json_encode($data); 