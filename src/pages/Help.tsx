import React, { useState } from 'react';
import { ScrollView, View, Text, TouchableOpacity, Image } from 'react-native';
import { help } from "../../styles/pages/help";
import { useTranslation } from 'react-i18next';
import Ionicons from '@expo/vector-icons/Ionicons';

function Help({ navigation, route }: { navigation: any, route: any }) {
  const { t, i18n } = useTranslation();
  const colorMode = route.params.colorMode;

  function changeLanguage(language: string | undefined) {
      i18n.changeLanguage(language);
  };

  const [faqs, setFaqs] = useState([
      {
          question: t('help.question1'),
          answer: t('help.answer1'),
          image: require('../../assets/images/help/Profile.png'),
          link: 'Home'
      },
      {
          question: t('help.question2'),
          answer: t('help.answer2'),
          image: require('../../assets/images/help/Quiz.png'),
          link: 'QuizzPage'
      },
      {
          question: t('help.question3'),
          answer: t('help.answer3'),
          image: require('../../assets/images/help/Calendar-create.png'),
          link: 'Calendar'
      },
      {
          question: t('help.question4'),
          answer: t('help.answer4'),
          image: require('../../assets/images/help/Calendar-delete.png'),
          link: 'Calendar'
      },
      {
          question: t('help.question5'),
          answer: t('help.answer5'),
          image: require('../../assets/images/help/ProcessIdea.png'),
          link: 'ProcessIdea'
      },
      {
          question: t('help.question6'),
          answer: t('help.answer6'),
          image: require('../../assets/images/help/Settings.png'),
          link: 'Settings'
      },
      {
          question: t('help.question7'),
          answer: t('help.answer7'),
          image: require('../../assets/images/help/Lexicon.png'),
          link: 'Lexicon'
      }
  ]);


  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    if (expandedIndex === index) {
      setExpandedIndex(null);
    } else {
      setExpandedIndex(index);
    }
  };

  return (
    <ScrollView style={colorMode === 'light' ?  help.container : help.containerDark}>
    <View>
        <TouchableOpacity
            style={help.homebtn}
            onPress={() => navigation.navigate('Home')}>
            <Ionicons name="chevron-back-outline" size={28} color={colorMode === 'light' ? "black" : "white"} />
        </TouchableOpacity>
    </View>
          <View style={help.content}>
            <Image source={require('../../assets/images/help/FAQs-bro.png')} style={colorMode === 'light' ? help.faqImage : help.faqImage} />
            {faqs.map((faq, index) => (
              <View key={index} style={colorMode === 'light' ? help.faqContainer : help.faqContainerDark}>
                <TouchableOpacity onPress={() => toggleFAQ(index)}>
                  <View style={colorMode === 'light' ? help.faqHeader : help.faqHeaderDark}>
                    <Text style={colorMode === 'light' ? help.faqQuestion : help.faqQuestionDark}>{faq.question}</Text>
                  </View>
                </TouchableOpacity>
                {expandedIndex === index && (
                  <>
                    <Text style={colorMode === 'light' ? help.faqAnswer : help.faqAnswerDark}>{faq.answer}</Text>
                    <TouchableOpacity onPress={() => navigation.navigate(faq.link)}>
                      <Image source={faq.image} style={help.faqImage} />
                    </TouchableOpacity>
                  </>
                )}
              </View>
            ))}
          </View>
        </ScrollView>
  );
};

export default Help;