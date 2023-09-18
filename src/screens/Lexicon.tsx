import React, { useState } from 'react';
import { ScrollView, View, Text, TouchableOpacity } from 'react-native';
import { lexicon } from "../../styles/pages/lexicon";

const Lexicon: React.FC = () => {
  const [faqs, setFaqs] = useState([
    { question: 'Vital Card', answer: 'Health insurance policies typically cover a wide range of medical expenses, such as hospitalization, surgical procedures, prescription drugs, laboratory tests, and doctor visits. Some policies may also cover specialized treatments such as dental, vision, or mental health care.' },
    { question: 'Passport', answer: 'A passport is a travel document that is issued by a government to its citizens for the purpose of international travel. It is an official proof of identity and citizenship that allows the passport holder to enter and exit foreign countries, and to request assistance and protection from their government while abroad.' },
    { question: 'Visa', answer: 'A visa is an official document or endorsement placed in a passport that allows the passport holder to enter, stay, or exit a foreign country for a specific period of time and for a specific purpose. The purpose of a visa is to regulate and control the entry and stay of foreign visitors in a country.' },
    { question: 'Proof of Residence', answer: 'A proof of address is a document that verifies where you live. It is often required as a form of identification when you need to open a bank account, apply for credit, or get a government-issued ID card. A proof of address can take many forms, but it typically includes your name, your address, and a date.' }
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
    <ScrollView style={{ flex: 1 }}>
      <View style={{ padding: 16 }}>
        <Text style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 16 }}>FAQ</Text>
        {faqs.map((faq, index) => (
          <View key={index} style={{ marginBottom: 16 }}>
            <TouchableOpacity onPress={() => toggleFAQ(index)}>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                <Text style={{ fontSize: 18 }}>{faq.question}</Text>
              </View>
            </TouchableOpacity>
            {expandedIndex === index && (
              <Text style={{ marginTop: 8 }}>{faq.answer}</Text>
            )}
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

export default Lexicon;