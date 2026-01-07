First-level key names are set based on domain, entity or feature they relate to.
UI Kit elements like buttons, inputs, etc. should have the same structure in all domains/features/entities.

Like:

```json
{
	"user": {
		"buttons": {
			"createUser": {
				"default": "Create User",
				"tooltip": "Click to create a new user",
				"loading": "Creating User..."
			}
		}
	},
	"auth": {
		"headings": {
			"signIn": "Sign in to your account"
		},
		"inputs": {
			"signIn": {
				"email": {
					"placeholder": "Enter your email",
					"errors": {
						"invalid": "The email address entered is not valid.",
						"required": "Email is required."
					}
				},
				"password": {
					"placeholder": "Enter your password",
					"errors": {
						"required": "Password is required.",
						"minLength": "Password must be at least {min} characters long.",
						"maxLength": "Password can be at most {max} characters long."
					}
				}
			}
		},
		"buttons": {
			"signIn": {
				"default": "Sign In",
				"loading": "Signing in..."
			}
		}
	}
}
```