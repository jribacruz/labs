var $template = Java.type('foo.service.TemplateService');

var daoFileContent = $template.merge('José Ribamar');

print(daoFileContent);

$template.input({
	name: 'José Ribamar Monteiro da Crux'
});