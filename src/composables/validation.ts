interface Status {
    valid: boolean,
    message?: string
}

/**
 * Rules
 * @param {string} value
 * @return {Status}
 */
type Rule = (value: string) => Status;

const required: Rule = (value: string): Status => {
    const result: boolean = Boolean(value);
    return {
        valid: result,
        message: result ? undefined : 'This field is required'
    };
}

function length({ min, max }: { min: number, max: number }): Rule {
    return function (value: string): Status {
        const result = Boolean(value.length >= min && value.length <= max);
        return {
            valid: result,
            message: result ? undefined : `This fields length must be between ${min} and ${max}`
        }
    }
}

// validation
function validate(value: string, rules: Rule[]): Status {
    for (const rule of rules) {
        const result: Status = rule(value);
        if (!result.valid) {
            return result;
        }
    }
    return { valid: true };
}

export { length, required, validate };
