import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const { width, height } = Dimensions.get('window');

const QuizScreen = ({ navigation }) => {
  const [scores, setScores] = useState({ vulnerable: 0, rationality: 0 });
  const [currentQuestion, setCurrentQuestion] = useState(0);

  const questions = [
    {
      question: "In Marion's exploration of love, he argues that true love requires the lover to give the love without expecting reciprocity. Would you rather: ",
      options: ['Love someone fully, even if they might never return your love.', 'Only love someone once you know they will love you back.'],
      scores: { vulnerable: 2, self: 2 }
    },
    {
      question: 'In Either/Or, the aesthetic life is one that prioritizes pleasure in the moment, while the ethical life prioritizes moral duty. Would you rather:',
      options: ['Live more presently, even though that may mean avoiding deeper responsibilities.', 'Focus on the ethical aspects of your life, sacrificing joy in the moment.'],
      scores: { hedonism: 2, responsibility: 2 }
    },
    {
      question: 'In Veronica, the character Veronica is someone who is very direct and can be very intense. If you were friends with someone like Veronica, would you:',
      options: ['Continue to be friends with them and hear them out despite how emotionally draining it will be.', 'Slowly distance yourself in order to protect your mental health.'],
      scores: { connection: 2, self: 2 }
    },
    {
      question: 'Marion says love is very fragile. It is very easy to objectify someone and forget that they are their own being. Would you rather:',
      options: ['Love someone while completely respecting their autonomy, even if that means you cannot fully “have” them as you are then treating them as an object.', 'Be in a relationship where you feel secure in possessing and being possessed.'],
      scores: { vulnerable: 2, self: 2 }
    },
    {
      question: 'Kierkegaard explains the importance of being true to yourself, even if that means social alienation. Would you rather:',
      options: ['Be true to who you are, even if that means scaring people away.', 'Conform to societal expectations of who you “should” be.'],
      scores: { authentic: 2, self: 2 }
    },
    {
      question: "In Veronica, Alison's life as a model was different from the challenging and grounded reality she experienced later. Would you rather:",
      options: ['Pursue an extremely appealing but unstable dream, knowing things may not last.', 'Accept a simpler life that prioritizes authenticity over appearance.'],
      scores: { authentic: 2, responsibility: 2 }
    },
    {
      question: 'Marion argues that love transforms the lover, reshaping who they are. Would you rather:',
      options: ['Open yourself to love, even if it changes your identity in ways you can’t control.', 'Stay true to who you are, even if it means possibly never finding love.'],
      scores: { connection: 2, authentic: 2 }
    },
    {
      question: 'In the Seducer’s Diary, Johannes is someone who avoids deeper commitments and puts himself before others in a way that hurts the people around him. Would you rather:',
      options: ['Manipulate relationships for personal pleasure, despite knowing that you may not have been completely true to yourself.', 'Pursue honest relationships, even if that means sacrificing the potential of having more relationships.'],
      scores: { hedonism: 2, authentic: 2 }
    },
    {
      question: 'In Veronica, both Veronica and Alison face very serious medical issues. Would you rather:',
      options: ['Face your morality head on and accept it.', 'Distract yourself from the thoughts of death.'],
      scores: { vulnerable: 2, self: 2 }
    },
    {
      question: 'Each of the text’s touch on the idea of relationships and understanding yourself better. When you find yourself to be lonely, do you:',
      options: ['Do a lot of personal reflection and spend a lot of time with yourself.', 'Seek relationships, music or any of outlets to fill that void.'],
      scores: { vulnerable: 2, connection: 2 }
    }
  ];

  const handleAnswer = (choiceIndex) => {
    const updatedScores = { ...scores };
    const traits = questions[currentQuestion].scores;
    const traitKeys = Object.keys(traits);

    if (choiceIndex === 0) {
      const traitForOptionA = traitKeys[0];
      updatedScores[traitForOptionA] = (updatedScores[traitForOptionA] || 0) + traits[traitForOptionA];
    } else if (choiceIndex === 1) {
      const traitForOptionB = traitKeys[1];
      updatedScores[traitForOptionB] = (updatedScores[traitForOptionB] || 0) + traits[traitForOptionB];
    }

    setScores(updatedScores);

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      navigation.navigate('Results', { scores: updatedScores });
    }
  };

  return (
    <LinearGradient
      colors={['#FDC2BD', '#F89C9A']}
      style={styles.container}
    >
      <Text style={styles.progressText}>
        Question {currentQuestion + 1}/{questions.length}
      </Text>
      <View style={styles.quizContainer}>
        <LinearGradient
          colors={['#FDC2BD', '#F89C9A']}
          style={styles.innerGradient}
        >
          {currentQuestion < questions.length ? (
            <>
              <Text style={styles.question}>
                {questions[currentQuestion].question}
              </Text>
            </>
          ) : null}
        </LinearGradient>
        {currentQuestion < questions.length ? (
          <>
            <TouchableOpacity
              style={styles.button}
              onPress={() => handleAnswer(0)}
            >
              <Text style={styles.buttonText}>{questions[currentQuestion].options[0]}</Text>
            </TouchableOpacity>
            <Text style={{fontSize: width * 0.05,
    color: 'gray',
    fontFamily: 'Gill Sans',
    marginVertical: height * 0.02,}}>- or -</Text>

            <TouchableOpacity
              style={{
                width: '90%',
                borderColor: '#888',
                borderWidth: 1,
                padding: height * 0.025,
                alignItems: 'center',
                borderRadius: width * 0.05,}}
              onPress={() => handleAnswer(1)}
            >
              <Text style={styles.buttonText}>{questions[currentQuestion].options[1]}</Text>
            </TouchableOpacity>
          </>
        ) : null}
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  progressText: {
    fontSize: width * 0.075,
    color: 'white',
    fontFamily: 'Gill Sans',
    marginBottom: height * 0.045,
  },
  quizContainer: {
    width: width * 0.9,
    paddingTop: height * 0.0025,
    paddingBottom: height*.05,
    borderRadius: width * 0.05,
    backgroundColor: 'white',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.4, 
    shadowRadius: 5, 
    shadowOffset: { width: 0, height: 3 },
  },
  innerGradient: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: width * 0.05,
    width: width * 0.85,
    height: height * 0.225,
    marginTop: width * 0.025,
  },
  question: {
    fontSize: width * 0.05,
    maxWidth: width * 0.7,
    textAlign: 'center',
    color: 'white',
    fontFamily: 'Gill Sans',
  },
  button: {
    marginTop: height * 0.025,
    width: '90%',
    borderColor: '#888',
    borderWidth: 1,
    padding: height * 0.025,
    alignItems: 'center',
    borderRadius: width * 0.05,
  },
  buttonText: {
    fontSize: width * 0.045,
    fontFamily: 'Gill Sans',
  },
});

export default QuizScreen;
