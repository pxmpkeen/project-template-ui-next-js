First-level key names are set based on domain, entity or feature they relate to.
UI Kit elements like buttons, inputs, etc. should have the same structure in all domains/features/entities.

Like:

```json
{
    "buttonName": {
        "default": "Default",
        "loading": "Loading...",
        "disabled": "Disabled"
    },
    "inputName": {
        "placeholder": "Enter text",
        "errors": {
            "invalid": "Invalid input",
            "required": "This field is required"
        },
        "label": "Label of input",
        "caption": "Additional information about the input",
        "help": "Help text for the input"
    },
    "inputGroupName": {
        "label": "Label of input group",
        "firstInput": {
            "placeholder": "Enter first value",
            "errors": {
                "invalid": "Invalid first input",
                "required": "First input is required"
            }
        },
        "secondInput": {
            "placeholder": "Enter second value",
            "errors": {
                "invalid": "Invalid second input",
                "required": "Second input is required"
            }
        },
        "caption": "Additional information about the input group"
    }
}
```