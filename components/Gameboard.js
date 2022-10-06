import { useState, useEffect } from 'react'
import { Text, View, Pressable } from 'react-native'
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons'
import styles from '../styles/style'

let board = []
const NBR_OF_DICES = 5
const NBR_OF_THROWS = 5
const WINNING_POINTS = 23

const row = []
for (let i=0; i < NBR_OF_DICES; i++) {
  row.push(
    <MaterialCommunityIcons
      name= {board[i]}
      key={'row' + 1}
      size={50}
      color={'steelblue'}>
    </MaterialCommunityIcons>
  )
}

export default function Gameboard () {
  const [nbrOfThrowsLeft, setNbrOfThrowsLeft] = useState(NBR_OF_THROWS )
  const [nbrOfWins, setNbrOfWins] = useState(0)
  const [sum, setSum] = useState(0)
  const [status, setStatus] = useState('')

  function throwDices () {
    let sum = 0
    for (let i = 0; i < NBR_OF_DICES; i++) {
      let randomNumber = Math.floor(Math.random() * 6 + 1)
      board[i] = 'dice' + randomNumber
      sum += randomNumber
    }
    setNbrOfThrowsLeft(nbrOfThrowsLeft-1)
    setSum(sum)
  }

  function checkWinner () {
   if (sum >= WINNING_POINTS && nbrOfThrowsLeft > 0) {
    setNbrOfWins(nbrOfWins+1)
    setStatus('Voitit!')
   }
   else if (sum >= WINNING_POINTS && nbrOfThrowsLeft === 0) {
    setNbrOfWins(nbrOfWins+1)
    setStatus('Voitit! Peli päättyi.')
   }
   else if (nbrOfWins > 0 && nbrOfThrowsLeft === 0) {
    setStatus('Voitit! Peli päättyi.')
   }
   else if (nbrOfThrowsLeft === 0) {
    setStatus('Hävisit.')
   }
   else  {
    setStatus('Jatka pelaamista.')
   }
  }

  useEffect(() => {
    checkWinner()
    if (nbrOfThrowsLeft === NBR_OF_THROWS) {
      setStatus('Peli ei ole alkanut')
    }
    if (nbrOfThrowsLeft < 0) {
      setNbrOfThrowsLeft(NBR_OF_THROWS-1)
      setNbrOfWins(0)
    }
  }, [nbrOfThrowsLeft])

  return (
    <View style={styles.gameboard}>
        <View style={styles.flex}>{row}</View>
        <Text style={styles.gameinfo}>Sum: {sum} </Text>
        <Text style={styles.gameinfo}>Throws left: {nbrOfThrowsLeft} </Text>
        <Text style={styles.gameinfo}>Wins: {nbrOfWins} </Text>
        <Text style={styles.gameinfo}> {status} </Text>
        <Pressable style={styles.button} onPress={() => throwDices()}>
            <Text style={styles.buttonText}>Heitä!</Text>
        </Pressable>
    </View>
  )
}
