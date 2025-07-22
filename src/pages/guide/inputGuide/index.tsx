import React from 'react';

import Input from '@/components/common/Input';

import ControlledInput from './ControlledInput';
import Login from './Login';

function InputGuide() {
  return (
    <>
      <form>
        <h2>기본 모양 종류</h2>
        <br />
        <Input name='테스트' placeholder='variant="default"' type='text' id='test1' />
        <br />
        <br />
        <Input
          variant='search'
          name='테스트'
          placeholder='variant="search"'
          type='text'
          id='test2'
        />
        <br />
        <br />
        <Input variant='name' name='테스트' placeholder='variant="name"' type='text' id='test3' />
      </form>
      <br />
      <br />
      <h2> rhf연결 테스트</h2>
      <br />
      <Login></Login>
      <br />
      <br />
      <h2> 제어컴포넌트</h2>
      <ControlledInput />
    </>
  );
}

export default InputGuide;
