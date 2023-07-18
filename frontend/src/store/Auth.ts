import { createSlice } from "@reduxjs/toolkit";

type AuthStateType = {
  isAuthanticated: boolean;
  isHome?:boolean;
  userDetail:User;
};

interface User {
  email:string,
  password:string,
  token:string
  id:any
}

const initalAuthState: AuthStateType = {
  isAuthanticated: false,
  isHome: false,
  userDetail: {
    email: '',
    password: '',
    token: '',
    id: undefined,
  }
};

const authSlice = createSlice({
  name: "authantication",
  initialState: initalAuthState,
  reducers: {
    loginAuth(state, action) {
      const result = action.payload.data;
      state.isAuthanticated = true;
      const data = {
        user: {
          email: result.email,
          password: result.password,
          id: result.id
        },
        isAuthantication: state.isAuthanticated // Burayı isAuthanticated olarak güncelleyin
      };
      state.userDetail.email = result.email;
      state.userDetail.password = result.password;
      state.userDetail.token = result.token;
      localStorage.setItem("authantication", JSON.stringify(data));
      localStorage.setItem("token", "Bearer " + result.token);
    },    
    logoutAuth(state) {
      state.isAuthanticated = false;
      localStorage.removeItem("authantication");
      localStorage.removeItem("token");
    },
    errorAuth(state){
      const auth = localStorage.getItem("authantication");
      if(auth){
        const data = JSON.parse(auth);
        const isAuth = data.isAuthantication;
        state.isAuthanticated = isAuth;
      }
    },
    homeAuth(state){
      state.isHome = true;
    },
    homeAuthLogout(state){
      state.isHome = false;
    }
  },
});

export const authActions = authSlice.actions;

export default authSlice.reducer;