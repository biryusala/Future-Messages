import './Authorization.scss';
import TextInput from "../UI/textInput";
import {setLoader, signIn} from "../../redux/actionCreators";
import {FormEvent, useEffect} from "react";
import {useDispatch} from "react-redux";
import useReduxStatePropertie from "../../hooks/useReduxStatePropertie";
import ThemeButton from "../UI/themeButton";

export default function Authorization() {
  const errorMessage = useReduxStatePropertie('signInErrorMsg');
  const dispatch = useDispatch();

  function submitForm(e: FormEvent) {
    e.preventDefault();
    const {login, password} = document.forms.namedItem('loginForm')!;
    dispatch(signIn({
      login: login.value,
      password: password.value
    }));
  }

  useEffect(() => {
    document.forms.namedItem('loginForm')!.login.focus();
  }, []);

  useEffect(() => {
    errorMessage && setLoader(false);
  }, [ errorMessage ]);

  return (
    <main className={'authorization'}>
      <form className={'authorization-loginForm'} name={'loginForm'} onSubmit={submitForm}>
        { errorMessage ? <span className={'authorization-errorMessage'}>{errorMessage}</span> : null}
        <TextInput
          name={'login'}
          placeholder={'Логин'}/>
        <TextInput
          name={'password'}
          placeholder={'Пароль'}
          type={'password'}/>
        <ThemeButton type={'submit'}
          name={'Войти'}/>
      </form>
    </main>
  )
}