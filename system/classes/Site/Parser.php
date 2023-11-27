<?php

namespace Site;

class Parser {
    public static function existArg(string $text = null, string $arg = null) : bool
    {   
        return strpos($text, "{{{$arg}}}") !== false;
    }

    public static function doParser(string $text = null,array $args = null) : string
    {
        if(!isset($text))
        {
            return false;
        }
        
        if(!isset($args))
        {
            return false;
        }

        foreach ($args as $key => $arg)
        {
            if(self::existArg($text,$key))
            {
                $text = str_replace("{{{$key}}}",$arg,$text);
            }
        }

        return $text;
    }
}