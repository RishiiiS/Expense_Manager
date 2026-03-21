const STORAGE_KEY = 'expense_manager_monthly_profile_v1';

const safeParse = (value) => {
    try {
        return JSON.parse(value);
    } catch {
        return null;
    }
};

const getStoredPayload = () => {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
        return { user: {}, monthly: {} };
    }

    const parsed = safeParse(raw);
    if (!parsed || typeof parsed !== 'object') {
        return { user: {}, monthly: {} };
    }

    return {
        user: parsed.user && typeof parsed.user === 'object' ? parsed.user : {},
        monthly: parsed.monthly && typeof parsed.monthly === 'object' ? parsed.monthly : {}
    };
};

export const getCurrentMonthKey = (date = new Date()) => {
    const month = String(date.getMonth() + 1).padStart(2, '0');
    return `${date.getFullYear()}-${month}`;
};

export const getCurrentMonthlyProfile = () => {
    const payload = getStoredPayload();
    return payload.monthly[getCurrentMonthKey()] || null;
};

export const hasCurrentMonthProfile = () => Boolean(getCurrentMonthlyProfile());

export const upsertCurrentMonthlyProfile = ({ totalMonthlyIncome, incomeSource, savingTarget, name, email }) => {
    const payload = getStoredPayload();
    const monthKey = getCurrentMonthKey();

    payload.user = {
        ...payload.user,
        ...(name ? { name } : {}),
        ...(email ? { email } : {})
    };

    payload.monthly[monthKey] = {
        totalMonthlyIncome: Number(totalMonthlyIncome) || 0,
        incomeSource: incomeSource || 'Not specified',
        savingTarget: Number(savingTarget) || 0,
        updatedAt: new Date().toISOString()
    };

    localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
};
