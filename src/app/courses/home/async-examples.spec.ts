import { delay } from 'rxjs/operators';
import { of } from 'rxjs';
import { fakeAsync, flush, flushMicrotasks, tick } from '@angular/core/testing';

describe('Async testing example', () => {
  it('Asyncronous test example with Jasmine done()', (done: DoneFn) => {
    let test = false;

    setTimeout(() => {
      console.log('running assertions');
      test = true;
      expect(test).toBeTruthy();
      done();
    }, 1000);
  });

  it('Asyncronous test example with setTimeout()', fakeAsync(() => {
    let test = false;

    setTimeout(() => {});

    setTimeout(() => {
      console.log('running assertions');

      test = true;
    }, 1000);

    flush();
    expect(test).toBeTruthy();
  }));

  it('Asynchronous test example - plain Promise', fakeAsync(() => {
    let test = false;

    console.log('Creating promise');

    Promise.resolve()
      .then(() => {
        return Promise.resolve();
      })
      .then(() => {
        console.log('Promise evaluated successfully');
        test = true;
      });
    flushMicrotasks();
    expect(test).toBeTruthy();
  }));

  it('Asynchronous test example - Promise + setTimeout', fakeAsync(() => {
    let counter = 0;

    Promise.resolve().then(() => {
      counter += 10;
      setTimeout(() => {
        counter += 1;
      }, 1000);
    });
    expect(counter).toBe(0);
    flushMicrotasks();
    expect(counter).toBe(10);
    tick(500);
    expect(counter).toBe(10);
    tick(500);
    expect(counter).toBe(11);
  }));
  it('Asynchronous test example - Observables', fakeAsync(() => {
    let test = false;

    const test$ = of(test).pipe(delay(1000));

    test$.subscribe(() => {
      test = true;
    });
    tick(1000);

    expect(test).toBeTruthy(true);
  }));
});
