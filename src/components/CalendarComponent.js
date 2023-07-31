import React from "react";
import { View, Button } from "react-native";

import { calendar_component } from "../../styles/components/calendar_component.js";

function CalendarComponent() {
    return (
        <View style={calendar_component.container}>
            <Button title="Disconnect" />
        </View >
    );
}

export default CalendarComponent;