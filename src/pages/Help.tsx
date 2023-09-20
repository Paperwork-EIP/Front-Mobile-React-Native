import React, { useState } from 'react';
import { ScrollView, View, Text, TouchableOpacity, Image, Linking } from 'react-native';
import { help } from "../../styles/pages/help";
import { useTranslation } from 'react-i18next';

const Help: React.FC = () => {
  const { t, i18n } = useTranslation();

  function changeLanguage(language: string | undefined) {
      i18n.changeLanguage(language);
  };

  const [faqs, setFaqs] = useState([
      {
          question: t('help.question1'),
          answer: t('help.answer1'),
          image: require('../../assets/images/help/Profile-light.png'),
          link: '/Home'
      },
      {
          question: t('help.question2'),
          answer: t('help.answer2'),
          image: require('../../assets/images/help/Quiz-light.png'),
          link: '/Quiz'
      },
      {
          question: t('help.question3'),
          answer: t('help.answer3'),
          image: require('../../assets/images/help/Calendar-create-light.png'),
          link: '/Calendar'
      },
      {
          question: t('help.question4'),
          answer: t('help.answer4'),
          image: require('../../assets/images/help/Calendar-delete-light.png'),
          link: '/Calendar'
      },
      {
          question: t('help.question5'),
          answer: t('help.answer5'),
          image: require('../../assets/images/help/ProcessIdea-light.png'),
          link: '/ProcessIdea'
      },
      {
          question: t('help.question6'),
          answer: t('help.answer6'),
          image: require('../../assets/images/help/Settings-light.png'),
          link: '/Settings'
      },
      {
          question: t('help.question7'),
          answer: t('help.answer7'),
          image: require('../../assets/images/help/Lexicon-light.png'),
          link: '/Lexicon'
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
    <ScrollView style={help.container}>
          <View style={help.content}>
            <Image source={require('../../assets/images/help/FAQs-bro.png')} style={help.faqImage} />
            {faqs.map((faq, index) => (
              <View key={index} style={help.faqContainer}>
                <TouchableOpacity onPress={() => toggleFAQ(index)}>
                  <View style={help.faqHeader}>
                    <Text style={help.faqQuestion}>{faq.question}</Text>
                  </View>
                </TouchableOpacity>
                {expandedIndex === index && (
                  <>
                    <Text style={help.faqAnswer}>{faq.answer}</Text>
                    <TouchableOpacity onPress={() => Linking.openURL(faq.link)}>
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