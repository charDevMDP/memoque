import { StatusBar } from 'expo-status-bar';
import { useCallback, useEffect, useState } from 'react';
import { Button, StyleSheet, Text, TouchableHighlight, TouchableOpacity, View } from 'react-native';
import Card from './src/components/Card';
import ConfettiCannon from 'react-native-confetti-cannon';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import TitleMQ from './src/components/TitleMQ';

// cartas de animales
const cards = [
  "​🐵",
  "🐶​",
  "🐱​",
  "🦁​",
  "🐻​",
  "🐸",
  "🐭",
  "🐮​"
]

// barajar arreglo de cartas
const shuffle = (array:string[]) => {
  for (let i = array.length -1; i > 0; i--) {
    const randomIndex = Math.floor(Math.random() * (i+1));

    // Intercambia los elementos
    [array[i], array[randomIndex]] = [array[randomIndex], array[i]]
    
  }
  return array
}


export default function App() {

  // fuente Josefin
    const [fontsLoaded] = useFonts({
    'J-light': require('./assets/fonts/JosefinSans-Light.ttf'),
    'J-medium': require('./assets/fonts/JosefinSans-Medium.ttf'),
    'J-regular': require('./assets/fonts/JosefinSans-Regular.ttf'),
    'J-italic': require('./assets/fonts/JosefinSans-Italic.ttf'),
    'J-bold': require('./assets/fonts/JosefinSans-Bold.ttf'),
  });


  // useState
  const [board, setBoard] = useState(() => shuffle([...cards,...cards]))
  const [selectedCards, setSelectedCards] = useState<any[]>([]);
  const [matchedCards, setMatchedCards] = useState<any[]>([]);
  const [score, setScore] = useState(0);
  const [showReset, setShowReset] = useState(false)

  // useEffects
  useEffect(() => {
    if(selectedCards.length < 2 ) return;
    if(board[selectedCards[0]] === board[selectedCards[1]]){ // si la pimer tarj seleccionada coincide con la 2da
      setMatchedCards([...matchedCards, ...selectedCards])
      setSelectedCards([])
    }else{
      const time = setTimeout(()=> setSelectedCards([]) ,800);
      return () => clearTimeout(time)
    }
  }, [selectedCards])
  
   useEffect(() => { // espera que carga todo para quitar el splash
    async function prepare() {
      await SplashScreen.preventAutoHideAsync();
    }
    prepare();
  }, []);

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  // verifica si carga la fuente
  if (!fontsLoaded) { return null; }


  // controla cuando toca la carta
  const handleTapCard = (i:any) => {

    let win = didPlayerWin();
    if(!win){ // si todavia no gano segui contando.. 
      if(selectedCards.length >= 2 || selectedCards.includes(i)) return;
      setSelectedCards([...selectedCards, i]);
      setScore(score+1)
    }
  }

  // reinicia el juego
  const resetGame = () => {
    setShowReset(false)
    setMatchedCards([]);
    setScore(0);
    setSelectedCards([]);
  }

  //  verifica si ya hizo match con todas las cartas, osea, gano
  const didPlayerWin = () => matchedCards.length === board.length

  return (
    <View style={styles.container} onLayout={onLayoutRootView}>
      <StatusBar style="light" />
      <TitleMQ />
      {
        /* SI GANA */
        didPlayerWin() && ( 
        <>        
          <ConfettiCannon 
          count={200} 
          fallSpeed={2000} 
          origin={{x: -10, y: 0}} 
          autoStart={true} 
          onAnimationEnd={ () => setShowReset(true)}
          />
          <Text style={styles.textWin}>FELICITACIONES GANASTE!</Text>
        </>

        )
      }
      
      <View style={styles.containerBoard}>
        {
          board.map( (card, i) => {
            const isTurnedOver = selectedCards.includes(i) || matchedCards.includes(i)
            return (
              <Card key={i} isTurnedOver={isTurnedOver} onPress={() => handleTapCard(i)}>
                {card}
              </Card>
            )
          })
        }
      </View>

      <Text style={styles.textMoves}>Movimientos: { score } </Text>
      {
        /* SI GANA PERMITO REINICIAR EL JUEGO */
        showReset && ( 
      <TouchableOpacity style={styles.btnReset} onPress={resetGame} >
        <Text style={styles.textBtnReset}>REINICIAR JUEGO</Text>
      </TouchableOpacity>
        )
      }

      
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#557153',
    alignItems: 'center',
    justifyContent: 'center',
  },
  containerBoard:{
    flexDirection: 'row', // poner en horinzotal
    flexWrap: 'wrap',
    justifyContent: 'center'
  },
  btnReset:{
    backgroundColor:'#E6E5A3',
    marginTop: 20,
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderRadius: 10
  },
  textWin:{
    fontSize: 18,
    color: '#E6E5A3',
    fontFamily: 'J-bold',
    marginBottom: 10
  },
  textMoves:{
    marginTop: 10, 
     fontSize: 18,
    color: '#E6E5A3',
    fontFamily: 'J-medium'
  },
  textBtnReset:{
    fontSize: 15,
    color: '#557153',
    fontFamily: 'J-bold',
    
  }
});


