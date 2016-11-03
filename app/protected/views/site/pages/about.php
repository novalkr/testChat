<?php
$this->pageTitle=Yii::app()->name . ' - About';
$this->breadcrumbs=array(
	'About',
);
?>
<h1>About</h1>
<?php
$this->beginWidget('application.modules.chat.components.ChatWidget');
$this->endWidget();
?>
<p>This is the "about" page for my blog site.</p>