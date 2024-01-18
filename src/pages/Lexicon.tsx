import React, { useState } from 'react';
import { ScrollView, View, Text, TouchableOpacity, Image, Linking } from 'react-native';
import { useTranslation } from 'react-i18next';
import { lexicon } from "../../styles/pages/lexicon";
import Ionicons from '@expo/vector-icons/Ionicons';

function Lexicon({ navigation, route }: { navigation: any, route: any }) {
  const { t } = useTranslation();
  const colorMode = route.params.colorMode;


  const [ faqs ] = useState([
      {
        question: t('lexicon.question1'),
        answer: t('lexicon.answer1'),
        image: require('../../assets/images/lexicon/vitale.png'),
        link: 'https://www.ameli.fr/assure/remboursements/etre-bien-rembourse/carte-vitale'
      },
      {
        question: t('lexicon.question2'),
        answer: t('lexicon.answer2'),
        image: require('../../assets/images/lexicon/passport.png'),
        link: 'https://www.service-public.fr/particuliers/vosdroits/N360'
      },
      {
        question: t('lexicon.question3'),
        answer: t('lexicon.answer3'),
        image: require('../../assets/images/lexicon/visa.png'),
        link: 'https://www.service-public.fr/particuliers/vosdroits/F16162'
      },
      {
        question: t('lexicon.question4'),
        answer: t('lexicon.answer4'),
        image: require('../../assets/images/lexicon/resident.png'),
        link: 'https://www.service-public.fr/particuliers/vosdroits/F14807'
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
    <ScrollView style={colorMode === 'light' ?  lexicon.container : lexicon.containerDark}>
    <View>
        <TouchableOpacity
            style={lexicon.homebtn}
            onPress={() => navigation.navigate('Home')}>
            <Ionicons name="chevron-back-outline" size={28} color={"black"} />
        </TouchableOpacity>
    </View>
      <View style={lexicon.content}>
        <Image source={require('../../assets/images/lexicon/Lexicon-icon.png')} style={lexicon.faqImage} />
        {faqs.map((faq, index) => (
          <View key={index} style={colorMode === 'light' ? lexicon.faqContainer : lexicon.faqContainerDark}>
            <TouchableOpacity onPress={() => toggleFAQ(index)}>
              <View style={colorMode === 'light' ? lexicon.faqHeader : lexicon.faqHeaderDark}>
                <Text style={colorMode === 'light' ? lexicon.faqQuestion : lexicon.faqQuestionDark}>{faq.question}</Text>
              </View>
            </TouchableOpacity>
            {expandedIndex === index && (
              <>
                <Text style={colorMode === 'light' ? lexicon.faqAnswer : lexicon.faqAnswerDark}>{faq.answer}</Text>
                <TouchableOpacity onPress={() => Linking.openURL(faq.link)}>
                  <Image source={faq.image} style={lexicon.faqImage} />
                </TouchableOpacity>
              </>
            )}
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

export default Lexicon;