<?
include_once 'func.php';
$post = json_decode(file_get_contents('php://input'), true);
$keys = ['name', 'phone', 'address', 'comment', 'variant', 'howMuch', 'date', 'time', 'list', 'total'];
if(empty($post)||count(array_intersect(array_keys($post), $keys))!=count($keys))status(false, error_msg:'Какое-то из полей не передано');
if(!empty($post['list'])){
    $message = '<b>     ❗❗❗Новый заказ❗❗❗     </b>\n\n';

    $message .= '<b>Имя:</b> '.htmlspecialchars($post['name']).'\n';
    $message .= '<b>Телефон:</b> '.htmlspecialchars($post['phone']).'\n';
    $message .= '<b>Адрес:</b> '.htmlspecialchars($post['address']).'\n';
    $message .= '<b>Комментарий:</b> '.htmlspecialchars($post['comment']).'\n\n';
    $message .= '<b>Способ оплаты:</b> '.$post['variant'].'\n';
    if($post['variant']=='Наличными')$message .= '<b>Сдача с суммы:</b> '.htmlspecialchars($post['howMuch']).' рублей\n';

    $message .= '<b>Итого:</b> '.$post['total'].'\n\n';

    $message .= '<b>Список:</b>\n';
    foreach($post['list'] as $item){
        $message .= '<b> • '.$item['name'].' '.$item['quantity'].' шт.</b>\n';
        // $message .= '<b>Название:</b> '.$item['name'].'\n';
        // $message .= '<b>Цена:</b> '.$item['price'].' рублей\n';
        // $message .= '<b>Количество:</b> '.$item['quantity'].'\n';
    }

    $message .= '\n<b>Дата и Время:</b> '.$post['date'].' '.$post['time'].'\n';

    status(items:notifications_bot_tg($message, -4217241167, false));

}else{
    status(false, error_msg:'Список товаров пуст');
}

return $menu;