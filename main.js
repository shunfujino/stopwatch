
//   HTMLタグで指定したIDにマッチするドキュメント要素を取得する
    let time_hour = document.getElementById('time_hour');
    let time_minute = document.getElementById('time_minute');
    let time_second = document.getElementById('time_second');
    let time_millisecond = document.getElementById('time_millisecond');
    
    let start_time = document.getElementById(`start_time`);
    
    let start = document.getElementById('start');
    let stop = document.getElementById('stop');
    let reset = document.getElementById('reset');
  
    let startTime;       // Startボタンクリック時の時刻
    let timeoutid;       // ID
    let elapsedTime = 0; // StartからStopまでの経過時間
  
    function countUp() {
        const d = new Date(Date.now()- startTime + elapsedTime);

        const h = String(d.getUTCHours());
        const m = String(d.getUTCMinutes());
        const s = String(d.getUTCSeconds());
        const ms = String(Math.floor(d.getUTCMilliseconds()/100));
        /* 描画 */
        time_hour.textContent = h;
        time_minute.textContent = m;
        time_second.textContent = s;
        time_millisecond.textContent = ms;
        
        
        
        timeoutid = setTimeout(() => {countUp();}, 10);
    }
    
    // 状態:初期 または Reset直後
    function setButtonStateInitial() {
    start.classList.remove('inactive'); // 活性
    stop.classList.add('inactive');    // 非活性
    reset.classList.add('inactive');   // 非活性
  }
  
  // 状態:タイマー動作中
  function setButtonStateRunning() {
    start.classList.add('inactive');   // 非活性
    stop.classList.remove('inactive');  // 活性
    reset.classList.remove('inactive');   // 活性
  }
  
  // 状態:タイマー停止中
  function setButtonStateStopped() {
    start.classList.remove('inactive'); // 活性
    stop.classList.add('inactive');    // 非活性
    reset.classList.remove('inactive'); // 活性
  }
    
  // ボタンを'初期'状態とする
  setButtonStateInitial()
  
  // Startボタンをクリックしてタイマーを開始
  start.addEventListener('click', () => {
    if (start.classList.contains('inactive') === true) {
    return;
    }
    // ボタンをタイマー'動作中'状態とする
    setButtonStateRunning();
    startTime = Date.now();
    countUp();
  });
  
//   Stopボタンをクリックしてタイマーを停止
  stop.addEventListener('click', () => {
    if (stop.classList.contains('inactive') === true) {
    return;
    }
    // タイマーを'停止中'状態とする
    setButtonStateStopped();
    clearTimeout(timeoutid);
    elapsedTime += Date.now() - startTime;
  });
  
//   ボタンをクリックして時間をリセット
    reset.addEventListener('click', () => {
    if (reset.classList.contains('inactive') === true) {
    return;
    }
    time_hour.textContent = 0;
    time_minute.textContent = 0;
    time_second.textContent = 0;
    time_millisecond.textContent = 0;
    
    elapsedTime = 0;
  });