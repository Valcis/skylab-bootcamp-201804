'use stric';

describe('Box', function(){
  it('box.keep() should save the secret ("my secret") correctly',function(){
    expect(box.keep('123', 'my secret'));
  });
});

