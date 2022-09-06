// built-in validaiton to handle my case
// you're free to use your own validation rules or to install a predefined one ...

interface IPasswordExpression {
    min?: number;
    max?: number;
    atLeastOneUppercase?: boolean;
    atLeastOneLowercase?: boolean;
    atLeastOneNumber?: boolean;
    atLeastOneSpecialCharacter?: boolean;
}

export class Validator {
    static nonEmptyStringValidation(field: string) {
        return Boolean(field && field.trim().length > 0);
    }
    static emailValidation(email: string) {
        return email && /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(email);
    }
    static passwordValidation(password: string, options?: IPasswordExpression) {
        return BuildPasswordExpression({ ...options }).test(password);
    }
}

// ^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$
function BuildPasswordExpression({
    min,
    max,
    atLeastOneUppercase,
    atLeastOneLowercase,
    atLeastOneNumber,
    atLeastOneSpecialCharacter,
}: IPasswordExpression) {
    let pattern = "^";
    atLeastOneLowercase && (pattern += "(?=.*?[a-z])");
    atLeastOneUppercase && (pattern += "(?=.*?[a-z])");
    atLeastOneNumber && (pattern += "(?=.*?[0-9])");
    atLeastOneSpecialCharacter && (pattern += "(?=.*?[#?!@$%^&*-])");
    pattern += ".";
    if (min && max) pattern += `{${min},${max}}`;
    else if (min) pattern += `{${min},}`;
    else if (max) pattern += `{,${max}}`;

    pattern += "$";
    return new RegExp(pattern);
}
