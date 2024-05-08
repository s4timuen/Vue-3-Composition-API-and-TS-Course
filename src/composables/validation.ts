interface Status {
    valid: boolean,
    message?: string
}

// rules
type Rule = (value: string) => Status;

function required(value: string): Status {
    const result: boolean = Boolean(value);
    return {
        valid: result,
        message: result ? undefined : 'This field is required'
    };
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

export { required, validate };
