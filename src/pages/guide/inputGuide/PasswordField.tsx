import FormInput from './FormInput';

function PasswordField() {
  return (
    <div>
      <label htmlFor='user-password'>비밀번호</label>
      <FormInput
        id='user-password'
        type='password'
        name='user-password'
        placeholder='비밀번호를 입력해주세요'
      />
    </div>
  );
}

export default PasswordField;
