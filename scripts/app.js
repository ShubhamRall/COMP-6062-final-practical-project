
const factAPI ='https://uselessfacts.jsph.pl/api/v2/facts/random'; //fact Api
const app = Vue.createApp({
//returning data to html
    data() {
        return {
            details:["Name","Id"],
            fact:[],
            weather:["Temperature","wind","Description"],
            define:["word","Phonetic","partOfSpeech","Defination"],   
        };
    },
    //created for updating of refresh
    created()
    {
        this.details.Name="Shubham";
        this.details.Id="1162845";
        this.getfact();
        this.getWeather();
        this.getdictionary();
    },
    //using methods to fetch API
    methods:{
        getfact()
        {
            fetch(factAPI)
            .then(response =>{
                return response.json()
            }).then(data=>{
                this.fact=data.text;
            })
            .catch(error=>{
                console.error('Error',error);
            }) ;
        },
        getWeather()
        {
            fetch(`https://goweather.herokuapp.com/weather/${this.city}`)
            .then(response =>{
                return response.json()
            }).then(data=>{
                this.weather.Temperature=data.temperature;
                this.weather.wind= data.wind;
                this.weather.Description = data.description;
            })
            .catch(error=>{
                console.error('Error',error);
            }) ;
        },
        getdictionary()
        {
            fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${this.word}`)
            .then(response =>{
                return response.json()
            }).then(data=>{
                const newData = data[0];
                this.define.word=newData.word;
                this.define.Phonetic=newData.phonetics[1].text;
                this.define.partOfSpeech=newData.meanings[0].partOfSpeech;
                this.define.Defination=newData.meanings[0].definitions[0].definition;
            })
            .catch(error=>{
                console.error('Error',error);
            }) ;
        }
    }
});
//Mounting data
app.mount('#app');