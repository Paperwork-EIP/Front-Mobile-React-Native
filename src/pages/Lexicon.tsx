import React, { useState } from 'react';
import { ScrollView, View, Text, TouchableOpacity, Image, Linking } from 'react-native';
import { lexicon } from "../../styles/pages/lexicon";

const Lexicon: React.FC = () => {
  const [faqs, setFaqs] = useState([
      {
        question: 'Vital Card',
        answer: 'Health insurance policies typically cover a wide range of medical expenses, such as hospitalization, surgical procedures, prescription drugs, laboratory tests, and doctor visits. Some policies may also cover specialized treatments such as dental, vision, or mental health care.',
        image: require('../../assets/images/lexicon/vitale.png'),
        link: 'https://www.ameli.fr/assure/remboursements/etre-bien-rembourse/carte-vitale'
      },
      {
        question: 'Passport',
        answer: 'A passport is a travel document that is issued by a government to its citizens for the purpose of international travel. It is an official proof of identity and citizenship that allows the passport holder to enter and exit foreign countries, and to request assistance and protection from their government while abroad.',
        image: require('../../assets/images/lexicon/passport.png'),
        link: 'https://www.service-public.fr/particuliers/vosdroits/N360'
      },
      {
        question: 'Visa',
        answer: 'A visa is an official document or endorsement placed in a passport that allows the passport holder to enter, stay, or exit a foreign country for a specific period of time and for a specific purpose. The purpose of a visa is to regulate and control the entry and stay of foreign visitors in a country.',
        image: require('../../assets/images/lexicon/visa.png'),
        link: 'https://www.service-public.fr/particuliers/vosdroits/F16162'
      },
      {
        question: 'Proof of Residence',
        answer: 'A proof of address is a document that verifies where you live. It is often required as a form of identification when you need to open a bank account, apply for credit, or get a government-issued ID card. A proof of address can take many forms, but it typically includes your name, your address, and a date.',
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
    <ScrollView style={lexicon.container}>
      <View style={lexicon.content}>
        <Image source={require('../../assets/images/lexicon/Lexicon-icon.png')} style={lexicon.faqImage} />
        {faqs.map((faq, index) => (
          <View key={index} style={lexicon.faqContainer}>
            <TouchableOpacity onPress={() => toggleFAQ(index)}>
              <View style={lexicon.faqHeader}>
                <Text style={lexicon.faqQuestion}>{faq.question}</Text>
              </View>
            </TouchableOpacity>
            {expandedIndex === index && (
              <>
                <Text style={lexicon.faqAnswer}>{faq.answer}</Text>
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