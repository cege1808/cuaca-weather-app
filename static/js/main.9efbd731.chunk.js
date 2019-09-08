(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{33:function(e,t,a){e.exports=a(57)},38:function(e,t,a){},39:function(e,t,a){},40:function(e,t,a){},50:function(e,t,a){},54:function(e,t,a){},57:function(e,t,a){"use strict";a.r(t);var n=a(0),r=a.n(n),i=a(25),c=a.n(i),s=(a(38),a(39),a(4)),l=a(7),o=a(8),d=a(10),u=a(9),p=a(1),h=a(11),m=a(2),v=a(6),f=a.n(v),g=(a(40),a(17)),y=a.n(g),b=a(13),E=a.n(b),_=a(18),k=a.n(_),w=(a(50),function(e){function t(e){var a;return Object(l.a)(this,t),(a=Object(d.a)(this,Object(u.a)(t).call(this,e))).state={address:""},a.handleChange=a.handleChange.bind(Object(p.a)(a)),a.handleSelect=a.handleSelect.bind(Object(p.a)(a)),a}return Object(h.a)(t,e),Object(o.a)(t,[{key:"handleChange",value:function(e){this.setState({address:e})}},{key:"handleSelect",value:function(e){Object(g.geocodeByAddress)(e).then(function(e){var t=e[0].geometry.location.lat(),a=e[0].geometry.location.lng(),n=e[0].formatted_address;this.props.onLocationChange(t,a,n)}.bind(this)).catch(function(e){return console.error("Error",e)})}},{key:"render",value:function(){return r.a.createElement(y.a,{value:this.state.address,onChange:this.handleChange,onSelect:this.handleSelect,searchOptions:{types:["(cities)"]}},function(e){var t=e.getInputProps,a=e.getSuggestionItemProps,n=e.suggestions;return r.a.createElement("div",{className:"autocomplete-root"},r.a.createElement(k.a,{label:"Search Location",outlined:"true",fullWidth:"true"},r.a.createElement(_.Input,Object.assign({className:"form-control"},t()))),r.a.createElement(E.a,{className:"autocomplete-dropdown-container"},n.map(function(e){return r.a.createElement(b.ListItem,Object.assign({},a(e),{className:e.active?"suggestion-item active":"suggestion-item"}),r.a.createElement(b.ListItemText,{primaryText:e.description}))})))})}}]),t}(r.a.Component)),S=a(14),x=a(19),C=a.n(x),j=a(26),N=a(12),T=a.n(N),O=a(27),A=a.n(O),F=a(28),I=(a(54),function(e){function t(e){var a;return Object(l.a)(this,t),(a=Object(d.a)(this,Object(u.a)(t).call(this,e))).state={activeIndex:0,datetime:"",lat:"",lng:"",address:"",description:"",current_temp:"",current_humidity:"",current_windspeed:"",current_precip:"",current_uv:"",current_visibility:"",current_graph_temp:[],current_graph_precip:[],current_graph_wind:[],dforecast_datetime:[],dforecast_temp:[],dforecast_precip:[],dforecast_wind:[],dforecast_icon:[],hforecast_temp:[],hforecast_precip:[],hforecast_wind:[]},a.getWeather=a.getWeather.bind(Object(p.a)(a)),a.handleActiveIndexUpdate=a.handleActiveIndexUpdate.bind(Object(p.a)(a)),a.handleCurrentTemp=a.handleCurrentTemp.bind(Object(p.a)(a)),a.handleCurrentUV=a.handleUV.bind(Object(p.a)(a)),a.handleAddress=a.handleAddress.bind(Object(p.a)(a)),a.renderDForecastTemp=a.renderDForecastTemp.bind(Object(p.a)(a)),a.renderDForecastPrecip=a.renderDForecastPrecip.bind(Object(p.a)(a)),a.renderDForecastWind=a.renderDForecastWind.bind(Object(p.a)(a)),a.renderDForecast=a.renderDForecast.bind(Object(p.a)(a)),a.renderHForecast=a.renderHForecast.bind(Object(p.a)(a)),a}return Object(h.a)(t,e),Object(o.a)(t,[{key:"componentDidMount",value:function(){this.setState({lat:this.props.lat,lng:this.props.lng,address:this.props.address}),this.getWeather()}},{key:"componentDidUpdate",value:function(e,t){this.props.address!==e.address&&(this.setState({lat:this.props.lat,lng:this.props.lng,address:this.props.address}),this.getWeather())}},{key:"handleActiveIndexUpdate",value:function(e){this.setState({activeIndex:e})}},{key:"getWeather",value:function(){var e=Object(j.a)(C.a.mark(function e(){var t,a=this;return C.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return"https://cors-anywhere.herokuapp.com/",t="https://api.darksky.net/forecast/".concat("0494a26ed44fe957270c49feb96e1c34","/").concat(this.props.lat,",").concat(this.props.lng,"?exclude=[minutely,flags]&units=si"),e.next=4,fetch("https://cors-anywhere.herokuapp.com/"+t,{headers:{"Content-Type":"application/json",Accept:"application/json"}}).then(function(e){return e.json()}).then(function(e){for(var t=e.currently,n=e.daily.data,r=e.hourly.data,i=[],c=[],s=[],l=[],o=[],d=[["Time","Temperature",{role:"annotation",type:"string"}]],u=[["Time","Precipitation",{role:"annotation",type:"string"}]],p=[["Time","Wind",{role:"annotation",type:"string"}]],h=0;h<4;h++){var m=n[h+1];l[h]=1e3*m.time,i[h]=[m.temperatureLow,m.temperatureHigh],c[h]=100*m.precipProbability,s[h]=3600*m.windSpeed/1e3,o[h]=m.icon}for(var v=0;v<12;v++){var f=r[v],g=new Date(1e3*f.time),y=f.temperature,b=100*f.precipProbability,E=3600*f.windSpeed/1e3;d.push([g,y,v%2===0?void 0:y.toFixed(1)]),u.push([g,b,v%2===0?void 0:b.toFixed(0)]),p.push([g,E,v%2===0?void 0:E.toFixed(1)])}a.setState({datetime:t.time,current_temp:t.temperature.toFixed(0),current_humidity:t.humidity,current_windspeed:t.windSpeed,current_precip:t.precipProbability,current_uv:t.uvIndex,current_visibility:t.visibility,description:t.summary,dforecast_datetime:l,dforecast_temp:i,dforecast_precip:c,dforecast_wind:s,dforecast_icon:o,hforecast_temp:d,hforecast_precip:u,hforecast_wind:p})}).catch(function(e){return console.log(e)});case 4:case"end":return e.stop()}},e,this)}));return function(){return e.apply(this,arguments)}}()},{key:"convertKelvinToCelcius",value:function(e){return(e-273.15).toFixed(1)}},{key:"capitalize",value:function(e){return e.charAt(0).toUpperCase()+e.slice(1)}},{key:"capitalizePhrase",value:function(e){var t=this,a=e.split(" ");return(a=a.map(function(e){return t.capitalize(e)})).join(" ")}},{key:"handleCurrentTemp",value:function(){if(""!==this.state.current_temp)return this.state.current_temp}},{key:"handleAddress",value:function(){return""!==this.state.address?this.capitalize(this.state.address.split(", ")[0])+", "+this.state.address.split(", ").slice(-1)[0]:""}},{key:"handleUV",value:function(){return""!==this.state.current_uv?"UV Index ".concat(this.state.current_uv):""}},{key:"handleVisibility",value:function(){return""!==this.state.current_uv?"Visibility ".concat(this.state.current_visibility.toFixed(0)," km"):""}},{key:"getDay",value:function(e){return["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"][new Date(e).getDay()]}},{key:"getIcon",value:function(e){return e.includes("cloudy")?"cloudy.svg":e.includes("rain")?"rainy-7.svg":e.includes("clear")?"day.svg":e.includes("snow")?"snowy-6.svg":e.includes("thunder")?"thunder.svg":void 0}},{key:"renderIcon",value:function(e){return r.a.createElement("i",null,r.a.createElement("img",{src:"".concat("/icons/amcharts_weather_icons_1.0.0/","/animated/").concat(this.getIcon(this.state.dforecast_icon[e])),alt:"weather-icon"}))}},{key:"renderDForecastTemp",value:function(){var e=[],t=!0,a=!1,n=void 0;try{for(var i,c=this.state.dforecast_temp.entries()[Symbol.iterator]();!(t=(i=c.next()).done);t=!0){var l=i.value,o=Object(S.a)(l,2),d=o[0],u=o[1];e.push(r.a.createElement(s.Cell,{columns:3,key:"ftemp-"+d,className:"dcell"},r.a.createElement("p",null,r.a.createElement("strong",null,this.getDay(this.state.dforecast_datetime[d]))),this.renderIcon(d),r.a.createElement("p",null,u[0].toFixed(0),"-",u[1].toFixed(0),"\xb0C")))}}catch(p){a=!0,n=p}finally{try{t||null==c.return||c.return()}finally{if(a)throw n}}return r.a.createElement(s.Row,null,e)}},{key:"renderDForecastPrecip",value:function(){var e=[],t=!0,a=!1,n=void 0;try{for(var i,c=this.state.dforecast_precip.entries()[Symbol.iterator]();!(t=(i=c.next()).done);t=!0){var l=i.value,o=Object(S.a)(l,2),d=o[0],u=o[1];e.push(r.a.createElement(s.Cell,{columns:3,key:"fprecip-"+d,className:"dcell"},r.a.createElement("p",null,r.a.createElement("strong",null,this.getDay(this.state.dforecast_datetime[d]))),this.renderIcon(d),r.a.createElement("p",null,u.toFixed(0),"%")))}}catch(p){a=!0,n=p}finally{try{t||null==c.return||c.return()}finally{if(a)throw n}}return r.a.createElement(s.Row,null,e)}},{key:"renderDForecastWind",value:function(){var e=[],t=!0,a=!1,n=void 0;try{for(var i,c=this.state.dforecast_wind.entries()[Symbol.iterator]();!(t=(i=c.next()).done);t=!0){var l=i.value,o=Object(S.a)(l,2),d=o[0],u=o[1];e.push(r.a.createElement(s.Cell,{columns:3,key:"fwind-"+d,className:"dcell"},r.a.createElement("p",null,r.a.createElement("strong",null,this.getDay(this.state.dforecast_datetime[d]))),this.renderIcon(d),r.a.createElement("p",null,u.toFixed(0),"km/h")))}}catch(p){a=!0,n=p}finally{try{t||null==c.return||c.return()}finally{if(a)throw n}}return r.a.createElement(s.Row,null,e)}},{key:"renderDForecast",value:function(){switch(this.state.activeIndex){case 0:return this.renderDForecastTemp();case 1:return this.renderDForecastPrecip();case 2:return this.renderDForecastWind();default:return}}},{key:"renderHForecast",value:function(){var e;switch(this.state.activeIndex){case 0:e=this.state.hforecast_temp;break;case 1:e=this.state.hforecast_precip;break;case 2:e=this.state.hforecast_wind}return r.a.createElement(F.a,{width:"100%",height:"150px",chartType:"LineChart",loader:r.a.createElement("div",null,"Loading Chart"),data:e,options:{hAxis:{gridlines:{count:6,color:"white"},textStyle:{color:"lightgrey",bold:!0},format:"hh a",baselineColor:"white"},vAxis:{gridlines:{count:0},textStyle:{color:"white"}},annotations:{style:"point",domain:{style:{color:"lightgrey",length:50}},textStyle:{color:"black",fontSize:12},alwaysOutside:!0},lineWidth:4,colors:["#56A0EE","#8C77FF"],fontName:"Product Sans",legend:"none",curveType:"function",animation:{startup:!0,easing:"linear",duration:800}}})}},{key:"render",value:function(){return r.a.createElement("div",{className:"content"},r.a.createElement("div",{className:"current-info"},r.a.createElement("h1",{className:"current-temp"},this.handleCurrentTemp(),r.a.createElement("sup",{className:"current-tempdeg"},"\xb0")),r.a.createElement("h3",{className:"no-margin current-desc"},this.state.description),r.a.createElement("p",{className:"no-margin current-address"},this.handleAddress()),r.a.createElement("p",{className:"current-uv"},this.handleUV()),r.a.createElement("p",{className:"no-margin current-visibility"},this.handleVisibility())),r.a.createElement("div",{className:"tab-bar"},r.a.createElement(A.a,{activeIndex:this.state.activeIndex,handleActiveIndexUpdate:this.handleActiveIndexUpdate},r.a.createElement(T.a,null,r.a.createElement("span",{className:"mdc-tab__text-label"},"Temperature")),r.a.createElement(T.a,null,r.a.createElement("span",{className:"mdc-tab__text-label"},"Precipitation")),r.a.createElement(T.a,null,r.a.createElement("span",{className:"mdc-tab__text-label"},"\xa0\xa0Wind\xa0\xa0\xa0")))),r.a.createElement("div",{className:"current-detail"},r.a.createElement("p",null,"Precipitation ",(100*this.state.current_precip).toFixed(0),"%"),r.a.createElement("span",null," \xb7 "),r.a.createElement("p",null,"Humidity ",(100*this.state.current_humidity).toFixed(0),"%"),r.a.createElement("span",null," \xb7 "),r.a.createElement("p",null,"Wind ",(3600*this.state.current_windspeed/1e3).toFixed(0),"km/h")),r.a.createElement("div",{className:"forecast-hourly"},this.renderHForecast()),r.a.createElement("div",{className:"forecast-daily"},this.renderDForecast()))}}]),t}(r.a.Component)),B=function(e){function t(e){var a;return Object(l.a)(this,t),(a=Object(d.a)(this,Object(u.a)(t).call(this,e))).state={isSearching:!1,lat:49.239623,lng:-123.110912,address:"Vancouver, Canada"},a.toggleSearch=a.toggleSearch.bind(Object(p.a)(a)),a.handleLocationChange=a.handleLocationChange.bind(Object(p.a)(a)),a}return Object(h.a)(t,e),Object(o.a)(t,[{key:"handleLocationChange",value:function(e,t,a){this.setState({lat:e,lng:t,address:a,isSearching:!1})}},{key:"renderPhoneBar",value:function(){var e=new Date,t=e.getHours(),a=e.getMinutes();return 1===t.toString().length&&(t="0"+t),1===a.toString().length&&(a="0"+a),r.a.createElement(m.TopAppBarRow,null,r.a.createElement(m.TopAppBarSection,{align:"start",className:"skinny-padding"},r.a.createElement(m.TopAppBarIcon,null,r.a.createElement("strong",{className:"phone-icon time"},t,":",a))),r.a.createElement(m.TopAppBarSection,{align:"end",className:"skinny-padding"},r.a.createElement(m.TopAppBarIcon,null,r.a.createElement(f.a,{icon:"signal_cellular_alt",className:"phone-icon"})),r.a.createElement(m.TopAppBarIcon,null,r.a.createElement(f.a,{icon:"wifi",className:"phone-icon"})),r.a.createElement(m.TopAppBarIcon,null,r.a.createElement(f.a,{icon:"battery_full",className:"battery-rotate phone-icon"}))))}},{key:"toggleSearch",value:function(){this.setState({isSearching:!this.state.isSearching}),console.log("showsearch: "+this.state.isSearching)}},{key:"renderAppBar",value:function(){return r.a.createElement(m.TopAppBarRow,null,r.a.createElement(m.TopAppBarSection,{align:"start"},r.a.createElement(m.TopAppBarIcon,{navIcon:!0,className:"non-pointer"},r.a.createElement(f.a,{icon:"cloud_queue"}))),r.a.createElement(m.TopAppBarSection,{align:"middle"},r.a.createElement(m.TopAppBarTitle,{className:"weather-title"},r.a.createElement("p",null,"Cuaca \xb7 Weather App"))),r.a.createElement(m.TopAppBarSection,{align:"end",role:"toolbar"},r.a.createElement(m.TopAppBarIcon,{actionItem:!0},r.a.createElement(f.a,{"aria-label":"add location",hasRipple:!0,icon:"search",onClick:this.toggleSearch}))))}},{key:"renderSearchBar",value:function(){return r.a.createElement("div",null,r.a.createElement("div",{className:"search-width search-bar-item"},r.a.createElement(w,{onLocationChange:this.handleLocationChange})),r.a.createElement(m.TopAppBarSection,{align:"end",role:"toolbar",className:"search-bar-item search-close-icon"},r.a.createElement(m.TopAppBarIcon,{actionItem:!0},r.a.createElement(f.a,{"aria-label":"close search",hasRipple:!0,icon:"close",onClick:this.toggleSearch}))))}},{key:"renderBar",value:function(){return this.state.isSearching?this.renderSearchBar():this.renderAppBar()}},{key:"renderRainBackground",value:function(){for(var e=[],t=1,a=0;a<6;a++)e.push(r.a.createElement("div",{className:"raindrop light",id:"raindrop-"+t,key:"raindrop-"+t})),t++;for(var n=0;n<4;n++)e.push(r.a.createElement("div",{className:"raindrop dark",id:"raindrop-"+t,key:"raindrop-"+t})),t++;return r.a.createElement("div",null,e)}},{key:"render",value:function(){return r.a.createElement(s.Row,{className:"phone-interface"},r.a.createElement(s.Cell,{desktopColumns:4,phoneColumns:0,tabletColumns:2}),r.a.createElement(s.Cell,{desktopColumns:4,phoneColumns:4,tabletColumns:4,align:"middle",className:"main mdc-elevation--z10 mdc-elevation-transition"},r.a.createElement("div",{className:"info-background"},this.renderRainBackground(),r.a.createElement(m.TopAppBarFixedAdjust,{className:"weather-bar",dense:"true"},this.renderPhoneBar(),this.renderBar()),this.props.children,r.a.createElement(I,{lat:this.state.lat,lng:this.state.lng,address:this.state.address}))))}}]),t}(r.a.Component);var D=function(){return r.a.createElement(s.Grid,{className:"App"},r.a.createElement(B,null))};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));var W=a(32);c.a.render(r.a.createElement(W.a,{basename:"/cuaca-weather-app"},r.a.createElement(D,null)),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then(function(e){e.unregister()})}},[[33,1,2]]]);
//# sourceMappingURL=main.9efbd731.chunk.js.map