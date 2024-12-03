sap.ui.define([
    "sap/ui/core/mvc/Controller",
     "sap/m/MessageToast"
], (Controller, MessageToast) => {
    "use strict";

    return Controller.extend("prettyclip.prettyclip.controller.View1", {
        onPressButton2() {
            const textField = this.byId("textfield1");
            const textField1 = this.byId("textfield2");
            if (textField) {
                textField.setValue("");
                MessageToast.show("Text field content cleared.");
            } else {
                MessageToast.show("Text field not found.");
            }
            if (textField1) {
                textField1.setValue("");
                MessageToast.show("Text field content cleared.");
            } else {
                MessageToast.show("Text field not found.");
            }
        },
        onPressButton1() {
            const radioGroup = this.byId("radioGroup1");
            const selectedIndex = radioGroup.getSelectedIndex();
            const selectedButton = radioGroup.getButtons()[selectedIndex];
            const selectedText = selectedButton ? selectedButton.getText() : "";
            let separator = ","; // Default separator

            switch (selectedIndex) {
                case 0:
                    separator = ",";
                    break;
                case 1:
                    separator = ".";
                    break;
                case 2:
                    separator = ";";
                    break;
                case 3:
                    separator = " ";
                    break;
                default:
                    MessageToast.show("No valid option selected.");
                    return;
            }

            navigator.clipboard.readText().then(text => {
                const textField = this.byId("textfield1");
                if (textField) {
                    const currentText = textField.getValue();
                    if (currentText) {
                        textField.setValue(currentText + separator + text);
                        MessageToast.show("Clipboard content appended to text field.");
                    } else {
                        textField.setValue(currentText + text);
                        MessageToast.show("Clipboard content set to text field.");
                    }
                } else {
                    MessageToast.show("Text field not found.");
                }
            }).catch(err => {
                MessageToast.show("Failed to read clipboard content.");
                console.error("Failed to read clipboard content: ", err);
            });
        },
        onPressButton3() {
            const radioGroup = this.byId("radioGroup1");
            const selectedIndex = radioGroup.getSelectedIndex();
            const selectedButton = radioGroup.getButtons()[selectedIndex];
            const selectedText = selectedButton ? selectedButton.getText() : "";

            const textField1 = this.byId("textfield1");
            const textField2 = this.byId("textfield2");
            const textField3 = this.byId("textfield3");

            if (textField1) {
                const currentText = textField1.getValue();
                let separator = ","; // Default separator

                switch (selectedIndex) {
                    case 0:
                    separator = ",";
                    break;
                case 1:
                    separator = ".";
                    break;
                case 2:
                    separator = ";";
                    break;
                case 3:
                    separator = " ";
                    break;
                default:
                    MessageToast.show("No valid option selected.");
                    return;
                }

                const separatedText = currentText.split(new RegExp(`[${separator}\n\t]`)).map(item => item.trim());

                // Filter out empty strings
                const filteredText = separatedText.filter(item => item.length > 0);
                
                // Get the minimum length from textfield3
                const minLength = textField3 ? parseInt(textField3.getValue(), 10) : 0;


                        // Pad elements with zeros if they are shorter than the minimum length
        const paddedText = filteredText.map(item => {
            while (item.length < minLength) {
                item = "0" + item;
            }
            return item;
        });

                if (textField2) {
                    const newText = paddedText.join("\n");
                    textField2.setValue(newText);
                    MessageToast.show("Text processed and inserted into textfield2.");
                } else {
                    MessageToast.show("Text field 2 not found.");
                }
            } else {
                MessageToast.show("Text field 1 not found.");
            }
        },
        onPressButton4() {
            const textField = this.byId("textfield2");
            if (textField) {
                const textToCopy = textField.getValue();
                navigator.clipboard.writeText(textToCopy).then(() => {
                    MessageToast.show("Text copied to clipboard.");
                }).catch(err => {
                    MessageToast.show("Failed to copy text to clipboard.");
                    console.error("Failed to copy text to clipboard: ", err);
                });
            } else {
                MessageToast.show("Text field not found.");
            }
        }
    });
});