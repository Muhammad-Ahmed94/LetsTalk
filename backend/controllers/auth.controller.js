export const signup = async (req, res) => {
    const { email, password, confirmPassword } = req.body;
}

export const login = async (req, res) => {
    console.log("login route");
};

export const logout = async (req, res) => {
    console.log("logout route");
}