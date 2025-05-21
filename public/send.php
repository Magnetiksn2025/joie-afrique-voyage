<?php
if ($_SERVER["REQUEST_METHOD"] === "POST") {
    $to = "coontact@lrad-tours.com";
    // ...
$subject = strip_tags($_POST["subject"] ?? 'Message depuis le site LRAD Tours');
// ...

    // Nettoyer les champs
    $name = strip_tags($_POST["name"] ?? '');
    $email = filter_var($_POST["email"] ?? '', FILTER_SANITIZE_EMAIL);
    $message = strip_tags($_POST["message"] ?? '');

    // Créer le contenu de l'e-mail
    $body = "Nom : $name\nEmail : $email\n\nMessage :\n$message";

    $headers = "From: $email\r\n";
    $headers .= "Reply-To: $email\r\n";

    if (mail($to, $subject, $body, $headers)) {
        echo "Message envoyé avec succès.";
    } else {
        http_response_code(500);
        echo "Erreur lors de l'envoi.";
    }
} else {
    http_response_code(403);
    echo "Méthode non autorisée.";
}
if (!empty($_POST['honeypot'])) {
    http_response_code(400);
    exit("Spam détecté.");
}

?>
