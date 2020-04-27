module.exports = function(RED) {
function RCSwitchNode(n){
	RED.nodes.createNode(this,n);
    var node = this;
	node.func=parseInt (n.func);
	node.systemcode=n.systemcode;
	node.pin=parseInt (n.pin);
	node.switchvalue=parseInt (n.switchvalue);
	node.device=n.device;
	node.group=n.group;
	node.channel=n.channel;
	node.family=n.family;
	node.channel=n.channel;
	node.channel=n.channel;
	
	this.on('input', function(msg) {
	var rcswitch = require('rcswitch4');

		try{
            switch (node.func)   
			  {
			  case 0: 
					 var group='';
					 var device;
					 var switchvalue;

					 if (node.group.length=5 && node.group.match('[01]{5}')!=null)
						{
						group=node.group;
						} 
 					   else if (node.group.length=1 && node.group.match('[1234]')!=null)
						{
						group=parseInt (node.group);
						} 
					   else if (msg.group.length=5 && msg.group.match('[01]{5}')!=null)
						{
						group=msg.group;	
						}
 					   else if (node.group.length=1 && node.group.match('[1234]')!=null)
						{
						group=parseInt (msg.group);
						} 
					   else 
					    {
					    node.log ('Keine group gefunden');
					    break;					   
					    };					

					   if (node.device.length=1 && node.device.match('[abcdABCD]')!=null)
					    {
	    
						if (node.device=='A' || node.device=='a')
						  device =1
						else if (node.device=='B' || node.device=='b')
						  device =2
						else if (node.device=='C' || node.device=='c')
						  device =3
						else if (node.device=='D' || node.device=='d')
						  device =4;
						} 
					   else if (msg.device.length=1 && msg.device.match('[abcdABCD]')!=null)
					    {
						if (msg.device=='A' || msg.device=='a')
						  device =1
						else if (msg.device=='B' || msg.device=='b')
						  device =2
						else if (msg.device=='C' || msg.device=='c')
						  device =3
						else if (msg.device=='D' || msg.device=='d')
						  device =4;
						}
					   else 
					    {
					    node.log ('Kein Device gefunden');
                        break;					   
					    };
					 if (node.switchvalue==0) 
					   switchvalue=false
					  else if (node.switchvalue==1)
					   switchvalue=true 
					    else if (node.switchvalue==2)
						  {
					      if (msg.payload==0 || msg.payload=='0') 
						    switchvalue=false 
					       else if (msg.payload==1)
						    switchvalue=true 
					       else
						    {
						    node.log ('Switchvalue ungültig gefunden');
                            break;	    
						    }
						  }
					    else
						 {
						 node.log ('Switchvalue ungültig gefunden');
                         break;	 
					 	 }	
					
					  rcswitch.enableTransmit(node.pin);		
					  if(switchvalue)
						 {
						 rcswitch.switchOn(group,device);
						 }
						else
						 {
						 rcswitch.switchOff(group,device);		
						 }
					  rcswitch.disableTransmit();  
                   
					  break;			   
			   case 1: 
					 var family='';
					 var group='';
					 var device;
					 var switchvalue;
					 if (node.family.length=1 && node.family.match('[abcdef]')!=null)
						{
						family= node.family;
						} 
					   else if (node.family.length=1 && node.group.match('[abcdef]')!=null)
						{
						family= (msg.family);
						} 
					   else 
					    {
					    node.log ('Keine family gefunden');
					    break;					   
					    };	
					 if (node.group.length=1 && node.group.match('[1234]')!=null)
						{
						group=parseInt (node.group);
						} 
					   else if (node.group.length=1 && node.group.match('[1234]')!=null)
						{
						group=parseInt (msg.group);
						} 
					   else 
					    {
					    node.log ('Keine group gefunden');
					    break;					   
					    };					

					   if (node.device.length=1 && node.device.match('[abcdABCD]')!=null)
					    {
	    
						if (node.device=='A' || node.device=='a')
						  device =1
						else if (node.device=='B' || node.device=='b')
						  device =2
						else if (node.device=='C' || node.device=='c')
						  device =3
						else if (node.device=='D' || node.device=='d')
						  device =4;
						} 
					   else if (msg.device.length=1 && msg.device.match('[abcdABCD]')!=null)
					    {
						if (msg.device=='A' || msg.device=='a')
						  device =1
						else if (msg.device=='B' || msg.device=='b')
						  device =2
						else if (msg.device=='C' || msg.device=='c')
						  device =3
						else if (msg.device=='D' || msg.device=='d')
						  device =4;
						}
					   else 
					   {
					   node.log ('Kein Device gefunden');
                       break;					   
					   };
					 if (node.switchvalue==0) 
					   switchvalue=false
					  else if (node.switchvalue==1)
					   switchvalue=true 
					    else if (node.switchvalue==2)
						  {
					      if (msg.payload==0 || msg.payload=='0') 
						    switchvalue=false 
					       else if (msg.payload==1)
						    switchvalue=true 
					       else
						    {
						    node.log ('Switchvalue ungültig gefunden');
                            break;	    
						    }
						  }
					    else
						 {
						 node.log ('Switchvalue ungültig gefunden');
                         break;	 
					 	 }	
					
					  rcswitch.enableTransmit(node.pin);		
					  if(switchvalue)
						 {
						 rcswitch.switchOn(family, group,device);
						 }
						else
						 {
						 rcswitch.switchOff(family, group,device);		
						 }
					  rcswitch.disableTransmit();  

  			          break;			   
			   case 2: 
                      var channel='';
					  var device;
					  var switchvalue;
					  var systemcode;
					  var i;
                      //node.log ("node.channel: " + node.channel);
                      //node.log ("msg.channel: " + msg.channel + "laenge: " + msg.channel.length);
					  
					  if (node.channel.length=6 && node.channel.match('[01]{6}')!=null)
					    {
	                    var i;
                        for (i=0;i<node.channel.length;i++) 						
						  {
						  if (node.channel.charAt(i)=="1")  
							  channel=channel+"0"; else channel=channel+"F"; 
						  };
						} 
					   else if (msg.channel.length=6 && msg.channel.match('[01]{6}')!=null)
					    {
                        for (i=0;i<msg.channel.length;i++) 						
						  {
						  if (msg.channel.charAt(i)=="1")  
							  channel=channel+"0"; else channel=channel+"F"; 
						  };
						}
					   else 
					   {
					   node.log ('Kein Channel gefunden');
                       break;					   
					   };
					  //node.log ("channel: " + channel); 
					  //node.log ("node.device: " + node.device); 
                       
					  if (node.device.length=1 && node.device.match('[abcdABCD]')!=null)
					    {
	    
						if (node.device=='A' || node.device=='a')
						  device ="0FFF"
						else if (node.device=='B' || node.device=='b')
						  device ="F0FF"
						else if (node.device=='C' || node.device=='c')
						  device ="FF0F"
						else if (node.device=='D' || node.device=='d')
						  device ="FFF0";
						} 
					   else if (msg.device.length=1 && msg.device.match('[abcdABCD]')!=null)
					    {
						if (msg.device=='A' || msg.device=='a')
						  device ="0FFF"
						else if (msg.device=='B' || msg.device=='b')
						  device ="F0FF"
						else if (msg.device=='C' || msg.device=='c')
						  device ="FF0F"
						else if (msg.device=='D' || msg.device=='d')
						  device ="FFF0";
						}
					   else 
					   {
					   node.log ('Kein Device gefunden');
                       break;					   
					   };
					  // node.log ("device: " + device); 

					   if (node.switchvalue==0) 
						  switchvalue="0F" 
					    else if (node.switchvalue==1)
						  switchvalue="FF" 
					    else if (node.switchvalue==2)
						  {
					      if (msg.payload==0 || msg.payload=='0') 
						    switchvalue="0F" 
					       else if (msg.payload==1)
						    switchvalue="FF" 
					       else
						    {
						    node.log ('Switchvalue ungültig gefunden');
                            break;	    
						    }
						  }
					    else
						 {
						 node.log ('Switchvalue ungültig gefunden');
                         break;	 
						 }	
					  systemcode=  channel + device + switchvalue;
					  rcswitch.enableTransmit(node.pin); 
					  rcswitch.sendTriState(systemcode);
					  node.log ("send code " + systemcode + " auf PIN " + node.pin + " success");
				      rcswitch.disableTransmit();
					  
					  break;			   
			   case 3: 
						if (node.systemcode.length>5)
						  {
						  systemcode=node.systemcode;
						  }
						  
						 else if(msg.payload.length>5)
						  {
						  systemcode=msg.payload;
						  }
						 else
						 {
						 node.log ('Kein systemcode gefunden');
                         break;	 
						 };
  
					  rcswitch.enableTransmit(node.pin); 
					  rcswitch.sendTriState(systemcode);
					  node.log ("send code " + systemcode + " auf PIN " + node.pin + " success");
					  rcswitch.disableTransmit();
  			          break;			   
			   case 4: 
						if (node.systemcode.length>5)
						  {
						  systemcode=node.systemcode;
						  }
						  
						 else if(msg.payload.length>5)
						  {
						  systemcode=msg.payload;
						  }
						 else
						 {
						 node.log ('Kein systemcode gefunden');
                         break;	 
						 };			   
					  rcswitch.enableTransmit(node.pin); 
					  rcswitch.send(systemcode);
					  node.log ("send code " + systemcode + " auf PIN " + node.pin + " success");
					  rcswitch.disableTransmit();
                      break;			   
				
			  }

			
		}
		catch(err){
			console.log(err);
		}
		
	
});
}
    RED.nodes.registerType("rcswitch",RCSwitchNode);
}
	
