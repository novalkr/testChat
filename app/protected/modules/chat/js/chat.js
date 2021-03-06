/**
 * test Chat Scripts
 * @type type
 */
Chat = {
    chatDiv : null,
    chatDivTitle :null,
    chatTitle : 'Chat',
    titleId : '',
    chatBody : null,
    chatInput : null,
    chatHistory : null,
    urlCreate : '/chat/message/create',   
    urlGetAll : '/chat/message/getLast',
    /**
     * draw chat into window
     * @param {type} element
     * @returns {undefined}
     */
    chat : function (){    
        //add to 
            //var element = jQuery('<div id="test-chat"></div>');
            var element = jQuery('<table id="test-chat"></table>');
            jQuery('body').append(element);
            this.chatDiv = element ;
        //set chat style    
            jQuery(element).css('position', 'fixed');
            jQuery(element).css('right', 0);
            jQuery(element).css('bottom', 0);
            //jQuery(element).css('height', '150px');
            jQuery(element).css('height', 'auto');
            jQuery(element).css('width', '150px');
            //jQuery(element).css('width', 'auto');
            jQuery(element).css('background-color', '#effdff');
            jQuery(element).css('margin-bottom', 0);
            
        //inside structure
            var chatTable = jQuery(element);
            var idTitle = jQuery(element).attr('id')+'-title';
        //title                             
            this.chatDivTitle = jQuery('<td id="'+idTitle+'">'+this.chatTitle+'</td>');
            var chatTableRowTitle = jQuery('<tr></tr>').append(this.chatDivTitle);
            jQuery(this.chatDivTitle).css('background-color', 'green');
        //body
            jQuery(chatTable).append(chatTableRowTitle);
            var idBody = jQuery(element).attr('id')+'-body';
            var chatTableBody = jQuery('<tr><td><table id="'+idBody+'"></table></td></tr>');
            jQuery(chatTable).append(chatTableBody);
            //jQuery(element).append(chatTable);
            jQuery('#'+idBody).css('width', '150px');
            var inputId = jQuery(element).attr('id')+'-input';
            this.chatBody = jQuery('#'+idBody);
            this.chatInput = jQuery('<input id="'+inputId+'" type="text" >');             
            //jQuery(this.chatInput).css('position', 'absolute');
            jQuery(this.chatInput).css('bottom', '5px');
            jQuery(this.chatInput).css('right', '5px');
            jQuery(this.chatInput).css('left', '5px');
            jQuery(this.chatInput).attr('placeholder', 'Put your message');
            jQuery(this.chatInput).attr('maxlength', 100);
            jQuery(this.chatBody).css('margin-bottom',0);            
            var thisObj = this;
            jQuery(thisObj.chatDivTitle).click(function(){
                 jQuery(thisObj.chatBody).toggle();
            });
        //input place
            var tmpTd = jQuery('<td></td>').append(this.chatInput);
            var tmpTr = jQuery('<tr></tr>').append(tmpTd);
            jQuery(this.chatBody).prepend(tmpTr);
            var thisObj = this;
            jQuery(this.chatInput).keyup(function(eventObject){
                if( eventObject.keyCode == 13  && jQuery(this).val() != '' ){
                    thisObj.sendMessage();
                }
            });
        //chat messajes
            this.chatHistory = jQuery('<table id="'+ jQuery(element).attr('id')+'-history"></table>');                        
            var tmpTd = jQuery('<td></td>').append(this.chatHistory );
            var tmpTr = jQuery('<tr></tr>').append(tmpTd);
            jQuery(this.chatBody).prepend(tmpTr);
            //jQuery(this.chatBody).prepend(this.chatHistory);
            //jQuery(this.chatHistory).wrap('<tr></tr>').wrap('<td></td>');            
            jQuery(this.chatHistory).css('margin-bottom',0);
            jQuery(this.chatHistory).css('border-color','green');
            jQuery(this.chatHistory).css('border-width','2px');
            jQuery(this.chatHistory).css('border-style','dashed');
            jQuery(this.chatHistory).css('margin-bottom',0);
            //Запускаем таймер
            this.getMessageAll();
            this.getByTimer();
        },

        /**
         * send data to servr
         * 
         * @returns {undefined}
         */
        sendMessage : function(){
            var messageStr ={};
            var chatInput = jQuery(this.chatInput);
            var chatHistory = jQuery(this.hatHistory);
            messageStr['message'] = jQuery(chatInput).val();
            jQuery(chatInput).val('');
            var data = {};
            var prefix = 'send to server: ';
            var thisObj = this;
            data['Message'] = messageStr;
                $.ajax({
                    type: 'POST',
                    //timeout: 5000,
                    dataType: "json",
                    data: data,
                    url: this.urlCreate ,
                    beforeSend: function(){
                        console.log(prefix + 'begin send');
                    },
                    success: function(answer) {
                        if(typeof (answer.console) == 'undefined' ){
                            answer.console = '';
                        }
                        console.log(prefix + 'has answer');
                        console.log(answer);
                        if(answer.status == 'Ok'){
                            //thisObj.addToHistory(messageStr['message'], answer.id);
                            jQuery(chatInput).val('');
                            //thisObj.getMessageAll(true);
                        } else {
                           jQuery(chatInput).val(messageStr['message']);
                           console.log(prefix + answer.console);
                        }
                    },
                    error:function(e){                        
                        console.error(prefix + 'hase error on conect');
                        console.log(e);
                        console.log(e.responseText);
                        //alert('Connect Error');
                        jQuery(chatInput).val(messageStr['message']);
                    }
                });
        },

        /**
         * add one message to message list
         * 
         * @param {type} msgStmr
         * @param {type} msgId
         * @param {type} userName
         * @returns {undefined}
         */
        addToHistory : function(msgStmr, msgId, userName, time){
            if(typeof (msgId) == 'undefined'   ){
                msgId = 0;
            }
            msgId = parseInt(msgId );
            if(isNaN(msgId)){
                msgId = 0;
            }
            if(typeof (userName) == 'undefined' ){
                userName = '';
            }
            if(typeof (time) == 'undefined' ){
                time = '';
            }
            //check  message is new
            if(msgId <= this.getMessageIdLast()){
                 return 0;
            }
            //check message is alredy in history
            if( jQuery('<#chat-row-id-'+msgId,this.chatHistory).length ){
                return 0;
            }
            var blockTime = jQuery('<div></div>');
            if(time){
                jQuery(blockTime).append( '['+time+'] ' );
            }
            jQuery(blockTime).css('position', 'relative');
            jQuery(blockTime).css('float', 'left');
            jQuery(blockTime).css('font-style', 'oblique');

            var blockUser = jQuery('<div></div>')
            jQuery(blockUser).append( userName );
            jQuery(blockUser).append( ': ' );
            
            var newTd = jQuery('<td></td>'); 
            jQuery(newTd).append( blockTime ); 
            jQuery(newTd).append( blockUser );  
            jQuery(blockUser).css('float', 'left');
            jQuery(blockUser).css('font-weight', 600);
            jQuery(newTd).append( msgStmr );
            jQuery(this.chatHistory);
            var newRow = jQuery('<tr id="chat-row-id-'+msgId+'" user="chat-row-user-id"></tr>');
            jQuery(newRow).append(newTd );            
            jQuery(this.chatHistory).append(newRow);
            if(jQuery(this.chatHistory).find('td').length > 15 ){
                jQuery(this.chatHistory).find('td').first().remove();
            }
            
            //brushing
            if((jQuery('tr', this.chatHistory).length % 2)){
                jQuery(newRow).css('background-color','#aaffaa');
            }else{
                jQuery(newRow).css('background-color','#ccffcc');
            }
        },
        
        /**
         * clear message list
         * @returns {undefined}
         */
        delHistory : function(){
            jQuery(this.chatHistory).find('tr').remove();
        },
        
        
        getMessageIdLast : function(){
            var max = 0;
                jQuery(this.chatHistory)
                    .find('tr')
                    .each(function(ind,elm){
                        var id = jQuery(elm).attr('id');
                        var num = id.toString().split('chat-row-id-');
                        num = num[1];
                        num = parseInt(num);
                        
                        if(num >  max){
                            max = num;
                        }                        
                    });
            return max;
        },
        
        /**
         * get all last message
         * @returns {undefined}
         */
        getMessageAll : function(onlyLast){
            var data = {};
            var max = 0;
            if(onlyLast){
                max =this.getMessageIdLast();
                    data['onlyAfter'] = max;
            }
                
            var thisObj = this;
            var prefix = 'sending quest for server - get all message: ';
                $.ajax({
                    //type: 'POST',
                    //timeout: 5000,
                    dataType: "json",
                    data: data,
                    url: this.urlGetAll ,
                    beforeSend: function(){
                        console.log(prefix + 'begin connect');
                    },
                    success: function(answer) {
                        if(!onlyLast){
                            thisObj.delHistory();
                        }
                        for (var key in answer.mesages){
                            var mesageOne = answer.mesages[key];
                            thisObj.addToHistory(
                                    mesageOne.message, 
                                    mesageOne.id, 
                                    mesageOne.userName,
                                    mesageOne.time
                                );
                        }                                                
                        console.log(answer);
                    },
                    error:function(e){
                        console.error(prefix + 'error on conect');
                        console.log(e);
                        console.log(e.responseText);
                        //alert('Connect Error');
                    }
                });
        },
        
        /**
         * start timer
         * @returns {undefined}
         */
        getByTimer : function(){
            this.getMessageAll(true);
            var thisObj = this;
            setTimeout(function () {
              thisObj.getByTimer(); 
            }, 3000);
        }
}
