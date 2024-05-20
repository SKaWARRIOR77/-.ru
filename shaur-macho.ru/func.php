<?
function status($status=true, $items=[], $error_msg=false, $type='items', $other = []){
    global $USER_ID;
    $ar = array('success'=>$status, 'auth'=>boolval(!empty($USER_ID)));
    if(!empty($other)){
        $ar = array_merge($other, $ar);
    }
    header("Content-Type: application/json");
    if($status&&empty($items))
    {
        $ar['success'] = false;
        $ar['error_msg'] = ($error_msg)?$error_msg:'Ответ пустой.';
        $ar[$type] = $items;
        echo json_encode($ar, JSON_UNESCAPED_UNICODE);
        exit();
    }elseif($status&&!empty($items)){
        $ar[$type] = $items;
        echo json_encode($ar, JSON_UNESCAPED_UNICODE);
        exit();
    }elseif($status===false&&!empty($error_msg)){
        $ar['success'] = false;
        $ar['error_msg'] = $error_msg;
        echo json_encode($ar, JSON_UNESCAPED_UNICODE);
        exit();
    }elseif($status===false&&empty($error_msg)){
        $ar['success'] = false;
        $ar['error_msg'] = 'Неизвестная ошибка.';
        echo json_encode($ar, JSON_UNESCAPED_UNICODE);
        exit();
    }else{
        $ar['success'] = false;
        $ar['error_msg'] = 'Неизвестная ошибка! Обратитесь в техподдержку.';
        echo json_encode($ar, JSON_UNESCAPED_UNICODE);
        exit();
    }

}

function notifications_bot_tg($mess, $chat_id, $htmlspecialchars=true){
    try {
        $token = "6924355368:AAHpVNXhWnShhgb78664wieDm8NrtVyLJ0s";
        if(in_array(gettype($mess), ['object', 'array'])){
            $mess = '<pre>'.var_export($mess, true).'</pre>';
        }elseif($htmlspecialchars){
            $mess = htmlspecialchars($mess);
        }
        $curl = curl_init();
        curl_setopt_array($curl, array(
            CURLOPT_URL => 'https://api.telegram.org/bot' . $token . '/sendMessage',
            CURLOPT_RETURNTRANSFER => true,
            CURLOPT_ENCODING => '',
            CURLOPT_MAXREDIRS => 10,
            CURLOPT_TIMEOUT => 0,
            CURLOPT_FOLLOWLOCATION => true,
            CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
            CURLOPT_CUSTOMREQUEST => 'POST',
            CURLOPT_POSTFIELDS =>'{
            "chat_id": '.$chat_id.',
                "text": "'.$mess.'",
            "parse_mode": "html"
        }',
            CURLOPT_HTTPHEADER => array(
            'Content-Type: application/json'
            ),
        ));	    
        $result = curl_exec($curl);
        curl_close($curl);
        return $result;
    }catch (Exception $e) {
        return $e;
    }
}