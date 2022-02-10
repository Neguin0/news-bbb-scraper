const axios = require('axios');
var JSSoup = require('jssoup').default;
const entities = require("entities");

async function bbb(){
	var api = [];
	const site = await axios('https://www.purepeople.com.br/famosos/bbb-22_p554532/noticias/1');
	var soup = new JSSoup(site.data);
	var noticia = soup.findAll('div', 'c-article-flux__content')
	for(let bloco of noticia){
		var title = bloco.find('a', 'c-article-flux__title').nextElement._text
		var subtitle = bloco.find('div', 'c-article-flux__chapo').nextElement._text
		var subtitle = entities.decodeHTML(subtitle);
		var link = 'https://www.purepeople.com.br' + bloco.find('a', 'u-global-link').attrs.href;
		var data = bloco.find('span', 'c-article-flux__date-day').nextElement._text + ' às ' + bloco.find('span', 'c-article-flux__date-hour').nextElement._text
		api.push({
			titulo: title,
			subtitulo: subtitle,
			link: link,
			data: data
		});
	}
	return api;
}

(async function(){
	console.log(await bbb());
})();
