var action = {
    execute: function() {
    	
    	var eclass = $template.get('');
    	
        $template.merge('template:/dao', {
        	name: 'José',
        	model: eclass
        });
        //$template.merge('template:/dao');
        print('Hello');
        print(eclass.getName());
    }
}
