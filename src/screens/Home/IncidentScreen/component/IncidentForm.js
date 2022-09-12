import React, {useState} from 'react';
import {ScrollView, Text} from 'react-native';
import CustomButton from '../../../../components/CustomButton/CustomButton';
import CustomInput from '../../../../components/CustomInput/CustomInput';

const IncidentForm = ({onPress, formField}) => {
  const [party1, setParty1] = useState(formField.party1);
  const [party2, setParty2] = useState(formField.party2);
  const [party3, setParty3] = useState(formField.party3);
  const [party4, setParty4] = useState(formField.party4);
  const [party5, setParty5] = useState(formField.party5);

  return (
    <ScrollView showsHorizontalScrollIndicator={false}>
      <Text>IKARA PU</Text>
      <CustomInput
        placeholder={formField.party1Label}
        value={party1}
        setValue={setParty1}
      />
      <CustomInput
        placeholder={formField.party2Label}
        value={party2}
        setValue={setParty2}
      />
      <CustomInput
        placeholder={formField.party3Label}
        value={party3}
        setValue={setParty3}
      />
      <CustomInput
        placeholder={formField.party4Label}
        value={party4}
        setValue={setParty4}
      />
      <CustomInput
        placeholder={formField.party5Label}
        value={party5}
        setValue={setParty5}
      />
      <CustomButton text={formField.submitLabel} onPress={onPress} />
    </ScrollView>
  );
};

export default IncidentForm;
