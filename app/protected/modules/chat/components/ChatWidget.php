<?php
/**
 * chat widget
 */
class ChatWidget extends CWidget {
   public function run() {
       
           ?>
        <div id="test-chat"></div>
        <script>    
            jQuery(document).ready(function(){
                Chat.chat();
            });
        </script>
        <?php
        Yii::app()->getClientScript()->registerCoreScript('jquery');   
        Yii::app()->clientScript->registerScriptFile(
                    //Yii::app()->assetManager->publish(
                    CHtml::asset(
                        Yii::getPathOfAlias('chat.js')
                            .'/chat.js'
                    ),
                    CClientScript::POS_END
                );  
        ;    
      
   }
}