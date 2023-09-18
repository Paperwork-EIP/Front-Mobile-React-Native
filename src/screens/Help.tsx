import React, { useState } from 'react';
import { ScrollView, View, Text, TouchableOpacity } from 'react-native';
import { help } from "../../styles/pages/help";

const Help: React.FC = () => {
  const [faqs, setFaqs] = useState([
    { question: 'How to update personal information?', answer: 'To update your personal information, go to the Profile page by clicking on the image below.\nFrom this page, you can:\n- Update your profile picture by entering the image link of your choice in the "Profile picture link" field,\n- Modify your username using the "Username" field,\n- Update your shared email address using the "Email" field,\n- Finally, change your password by entering the new password twice.' },
    { question: 'How to add a process?', answer: 'To add new processes, go to the Quiz page by clicking on the image below.\nFrom this page, you can choose a process from the available options.\nOnce you have selected a process, you will need to answer questions about your progress in the process (possession of necessary documents, eligibility for process advancement, etc.).\nOnce the question phase is completed, you will be redirected to a page that compiles all the information about the ongoing process, and you can add events related to it in the calendar if necessary.' },
    { question: 'How to add an event to the calendar?', answer: 'To add events related to processes, go to the Calendar page by clicking on the image below.\nFrom the calendar, you can view existing events and add new ones.\nTo do this, simply click on the date on which you want to add an event.\nThen click on the "Add an Event" button. You will need to provide the time of the event, the process associated with the event from the list of ongoing processes, and finally the step of the process. Finally, click on "Submit" once all the details are filled in to create the event.' },
    { question: 'How to delete or modify an event in the calendar?', answer: 'To modify or delete events related to processes, go to the Calendar page by clicking on the image below.\nFrom the calendar, you can view existing events and modify or delete them.\nTo do this, simply click on the date for which you want to modify the event.\nThen click on the "Edit/Delete an Event" button. For modification, you will need to enter the new time or step you want to assign to your event and click the "Submit" button to save the changes. Alternatively, you can directly click the "Delete Event" button to delete the event.' },
    { question: 'I can\'t find the process I need in the list of available processes. What should I do?', answer: 'If you can\'t find the process you want to launch in the available processes list, you have the option to let us know through the Process Idea page by clicking on the image below.\nProvide the title, description, and content of the desired process, press the "Submit" button, and we will receive your request. You can also contact us via the contact button at the bottom of this page by sending an email to paperwork_2024@labeip.epitech.eu.' },
    { question: 'How can I modify my personal information?', answer: 'To modify your personal information, go to the Settings page, where you can:\n- Choose a profile picture,\n- Modify your name,\n- Modify your surname,\n- Modify your age,\n- Modify the application language,\n- Modify your email address,\n- Modify your postal address,\n- Modify your phone number,\n- And finally, modify your password.' },
    { question: 'What should I do if I don\'t understand one of the technical terms used on the website?', answer: 'The Lexicon page, which lists the definitions of technical terms, is available by clicking on the image below!' }
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

export default Help;