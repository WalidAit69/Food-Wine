export const LoginForm = ({
    password,
    setpassword,
    email,
    setEmail,
    label,
    onsubmit,
  }) => {
    return (
      <form onSubmit={onsubmit} className="register_form">
        <input
          onChange={(e) => setEmail(e.target.value)}
          className="user_input"
          type="Email"
          value={email}
          placeholder="Email"
          required
        />
        <input
          onChange={(e) => setpassword(e.target.value)}
          className="user_input"
          type="Password"
          value={password}
          placeholder="Password"
          required
        />
        <div className="check">
          {" "}
          <input
            className="checkbox"
            type="checkbox"
            name="terms"
            id=""
            required
          />
          <label className="label" htmlFor="terms">
            I agree to food&wine's{" "}
            <span>
              <a href="">Terms of Service</a>
            </span>
          </label>
        </div>
        <button className="btn" type="submit">
          {label}
        </button>
      </form>
    );
  };
  