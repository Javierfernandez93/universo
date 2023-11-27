<?php 

namespace DummyTrader\Sdk;

use DummyTrader\Sdk\UrlManager;

use GuzzleHttp\Client;
use GuzzleHttp\RequestOptions;
use Exception;

class Sdk {
    private $api_key = 'SET_YOUR_API_KEY';
    private $api_secret = 'SET_YOUR_API_SECRET';
    
    public function __construct(string $api_key = null,string $api_secret = null)
    {
        if(isset($api_key) === true)
        {
            if(isset($api_secret) === true)
            {
                $this->api_key = $api_key;
                $this->api_secret = $api_secret;
            } else {
                throw new Exception('Invalid API Secret');
            }
        } else {
            throw new Exception('Invalid API Key');
        }
    }

    public function login() : array
    {
        $Client = new Client(['verify' => true, 'auth' => [$this->api_key, $this->api_secret]]);

        $response = $Client->get(UrlManager::LOGIN);

        if($response->getStatusCode() == 200) 
        {
            return json_decode($response->getBody()->getContents(),true);
        }

        return [];
    }

    public function sendMessageToChannel(array $data = null) : array
    {
        if(isset($data['message'])) 
        {
            if(is_string($data['message'])) 
            {
                $Client = new Client(['verify' => true, 'auth' => [$this->api_key, $this->api_secret]]);

                $response = $Client->post(UrlManager::SEND_MESSAGE_TO_CHANNEL, [
                    RequestOptions::JSON => $data
                ]);

                if($response->getStatusCode() == 200) 
                {
                    return json_decode($response->getBody()->getContents(),true);
                }

                return [];
            } else {
                throw new Exception('Invalid message format');
            }
        } else {
            throw new Exception('Invalid message');
        }
    }
}