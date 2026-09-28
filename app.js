(() => {
  'use strict';
  const {projects, companies} = window.portfolio;
  const main = document.querySelector('main');
  const dialog = document.querySelector('#image-viewer');
  const icon = name => `<i data-lucide="${name}" aria-hidden="true"></i>`;
  const esc = text => String(text).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  let currentRoute = '';
  let observer;
  let lastProject = '';

  function visual(p) {
    if (p.id === 'tripf') return `<figure class="project-media media-tripf"><span class="media-kicker">TRIPF / SERVICE</span><img src="assets/bn-tripf-device.png" alt="Tripf 여행 코스 목록 실제 화면" width="628" height="351"><figcaption>여행 코스와 굿즈를 연결하는 서비스</figcaption></figure>`;
    if (p.id === 'oz') return `<figure class="project-media media-oz"><span class="media-kicker">OZ / CAREER OPERATIONS</span><div class="network-total"><strong>56<span>곳</span></strong><p>공고 연계 기업·이용 플랫폼</p></div><div class="network-metrics">${[['83','인턴십 공고 · 건'],['709','전체 지원자 · 명'],['32','최종 합격자 · 명']].map(([v,l])=>`<div><strong>${v}</strong><span>${l}</span></div>`).join('')}</div><figcaption>기업 발굴에서 지원·합격 관리까지</figcaption></figure>`;
    if (p.id === 'unity') return `<figure class="project-media media-unity"><span class="media-kicker">UNITY / NPS ANALYSIS</span><div class="nps-crop"><img src="assets/bn-nps-source.png" alt="기존 포트폴리오에 수록된 회차별 NPS 분석 그래프" width="714" height="1011" loading="lazy"></div><figcaption>회차별 NPS와 실제 의견을 함께 분석</figcaption></figure>`;
    if (p.id === 'mingle') return `<figure class="project-media media-mingle"><span class="media-kicker">MINGLE DAY / LIVE INTERACTION</span><div class="mingle-count"><strong>100<span>명 이상</span></strong><p>함께 참여하는 아이스브레이킹</p></div><div class="live-flow">${[['message-square','응답 수집'],['radio','실시간 동기화'],['list-checks','결과 집계']].map(([i,l],n)=>`${n?icon('arrow-right'):''}<div>${icon(i)}<span>${l}</span></div>`).join('')}</div><figcaption>참여자 답변을 진행자 한 화면으로</figcaption></figure>`;
    return `<figure class="project-media media-wiki"><span class="media-kicker">INFRASTRUCTURE / KNOWLEDGE BASE</span><div class="wiki-heading">${icon('library')}<strong>팀의 운영 지식,<br>한곳에서 찾도록.</strong></div><div class="knowledge-index">${[['01','Linux · Unix','OS·버전별 분류'],['02','운영 명령어','팀 공동 참조'],['03','장애 대응 이력','기록과 조치 공유']].map(([n,t,d])=>`<div><span>${n}</span><strong>${t}</strong><small>${d}</small></div>`).join('')}</div><figcaption>개인 메모 → 테스트 VM 기반 공유 Wiki</figcaption></figure>`;
  }

  function card(p) {
    const actions={oz:'흩어진 채용 정보를 연결하고,\n지원부터 합격까지 관리했습니다.',tripf:'조회 구조와 캐시를 개선해\n피드 응답시간을 줄였습니다.',unity:'평균에 가려진 원인을 찾아\n직군별 개선안을 제안했습니다.',mingle:'쏟아지는 답변을 모아\n진행자가 바로 확인하도록.',wiki:'개인의 운영 기록을\n팀의 공유 자산으로 바꿨습니다.'};
    return `<article class="project-panel ${p.color}" id="panel-${p.id}" aria-labelledby="title-${p.id}"><div class="project-split">${visual(p)}<div class="project-copy"><p class="project-category"><span>${p.number}</span> ${p.category}</p><h3 id="title-${p.id}">${p.name}</h3><p class="project-action">${actions[p.id].split('\n').join('<br>')}</p><div class="project-outcome"><strong>${p.cardMetric}</strong>${p.id==='tripf'?'<small>개별 피드 조회 측정값 · 9ms는 캐시 적중 시</small>':''}</div><a class="project-open" id="card-${p.id}" href="#/project/${p.id}" aria-label="${esc(p.name)} 상세 보기">프로젝트 자세히 보기 ${icon('arrow-up-right')}</a></div></div></article>`;
  }

  function home() {
    return `<div class="wrap"><section class="intro" id="home"><div><p class="eyebrow">EDUCATION OPERATIONS & ENGINEERING</p><h1>이빛나</h1><p class="intro-line">운영 현장의 문제를 읽고,<br>데이터와 기술로 해결합니다.</p><p class="intro-note">교육·취업 운영, 서비스 개발, 금융 인프라 운영의 경험을 연결합니다.</p><div class="inline-links"><a href="https://github.com/chews26" target="_blank" rel="noreferrer">GitHub ${icon('arrow-up-right')}</a><a href="https://shinelee26.tistory.com" target="_blank" rel="noreferrer">Blog ${icon('arrow-up-right')}</a><a href="mailto:chews26@naver.com">Email ${icon('arrow-up-right')}</a></div></div><div class="portrait"><img src="assets/bn-notion-cover-v1.png" alt="이빛나 증명사진"></div><a class="intro-next" href="#projects">주요 프로젝트 ${icon('arrow-down')}</a></section><section class="projects-section" id="projects" aria-labelledby="projects-title"><div class="section-heading"><div><p class="eyebrow">SELECTED WORK / 01–05</p><h2 id="projects-title">주요 프로젝트</h2></div><span>교육 운영에서 서비스 개발까지</span></div><div class="project-list">${projects.map(card).join('')}</div></section></div>
    <section class="about-band" id="about"><div class="wrap about-grid"><div class="about-intro"><p class="eyebrow">EXPERIENCE & SKILLS</p><h2>현장을 이해하는 운영자,<br>직접 구현하는 개발자.</h2><p>운영의 작은 불편을 발견하고, 데이터를 통해 원인을 살핍니다. 서비스의 흐름을 설계하는 일부터 반복 업무를 줄이는 도구를 만드는 일까지 직접 실행해 왔습니다.</p><div class="skill-groups">${['교육·취업 운영','프로그램 기획','데이터 분석','Java · Spring Boot','Redis · JPA','AWS · Docker','Linux · Unix','Airtable · Notion'].map(s=>`<span class="skill">${s}</span>`).join('')}</div></div><div><div class="career-row"><span class="career-date">2025.09 – 현재</span><h3>넥스트러너스 <span>· 취업운영매니저</span></h3><p>취·창업 프로그램, 채용연계, 수료생 관리와 데이터 자동화</p></div><div class="career-row"><span class="career-date">2025.03 – 2025.08</span><h3>팀스파르타 <span>· Unity 과정 APM</span></h3><p>학습 운영, 만족도 분석, 참여 프로그램 기획과 웹 도구 제작</p></div><div class="career-row"><span class="career-date">2023.07 – 2024.06</span><h3>리눅스데이타시스템</h3><p>금융권 Linux·Unix·VM 인프라 운영</p></div><div class="career-row"><span class="career-date">2022.05 – 2023.07</span><h3>테크니컬서비스엔지니어그룹</h3><p>서버 운영, 보안·감사 대응, 모니터링 및 장애 대응</p></div><p class="education">영남대학교 · 2018–2022<br>새마을국제개발학과 / 사회복지 복수전공</p></div></div></section>
    <div class="wrap"><section class="contact" id="contact"><div><p class="eyebrow">LET'S CONNECT</p><h2>함께 해결할 문제를 기다립니다.</h2><p>프로젝트와 협업에 관한 이야기를 나누고 싶습니다.</p></div><div class="contact-links"><a href="mailto:chews26@naver.com">${icon('mail')} chews26@naver.com</a><a href="https://github.com/chews26" target="_blank" rel="noreferrer">${icon('github')} github.com/chews26 ${icon('arrow-up-right')}</a></div></section></div>`;
  }

  const flow = (labels) => `<div class="flow">${labels.map(([title,sub],i)=>`${i?icon('arrow-right'):''}<div class="flow-item"><strong>${title}</strong><span>${sub}</span></div>`).join('')}</div>`;
  function diagram(type) {
    if (type === 'fragmented') return `<div class="diagram"><div class="diagram-label">정보가 끊기는 지점</div><div class="problem-stack"><div><strong>교육팀별 기업 컨택·지원자 관리</strong><span>개별 경로로 기업 조건과 지원 정보 축적</span></div><div><strong class="gap-warning">중앙 공유 누락</strong><span>지원 이력·합격 결과 누락 / 후속 행정 병목</span></div></div></div>`;
    if (type === 'query') return `<div class="diagram"><div class="diagram-label">조회 비용을 나누어 접근</div>${flow([['연관 데이터 조회','N+1 문제 확인'],['조회 구조 개선','반복 쿼리 감소'],['Redis 캐시','반복 요청의 DB 접근 제한']])}</div>`;
    if (type === 'nps') return `<div class="diagram"><div class="diagram-label">평균에서 놓친 서로 다른 학습 경험</div><div class="problem-stack"><div><strong>기획 직군</strong><span>개발 부담 · 기획서 압박<br>리드·서브리드 역할 갈등</span></div><div><strong>개발 직군</strong><span>난이도 상승 · 시간 부족<br>팀 구성 불만 · 최종 일정 피로</span></div></div></div>`;
    if (type === 'mingleFlow') return `<div class="diagram"><div class="diagram-label">참여자와 진행자의 화면을 연결</div>${flow([['참여자 응답','웹 화면에서 답변 제출'],['실시간 동기화','Realtime Database'],['관리자 결과 확인','정답·대표 답변 집계']])}</div>`;
    if (type === 'wikiFlow') return `<div class="diagram"><div class="diagram-label">개인 기록에서 팀의 운영 자산으로</div>${flow([['개인 NotePad','개별 명령어·장애 이력'],['테스트 VM에 Wiki','팀원 자료 취합·분류'],['공동 참조','OS·버전별 운영 기준']])}</div>`;
    if (type === 'performance') return `<div class="chart" role="img" aria-label="피드 조회 응답시간: 초기 56밀리초 6쿼리, N+1 개선 후 20밀리초 4쿼리, 캐시 적중 시 9밀리초 0쿼리"><div class="diagram-label">피드 조회 · 단계별 응답시간과 DB 쿼리 수</div>${[['초기',100,'56ms / 6회','initial'],['N+1 개선',35.71,'20ms / 4회','middle'],['캐시 적중',16.07,'9ms / 0회','']].map(([label,width,value,cls])=>`<div class="bar-row"><span>${label}</span><div class="bar-rail"><div class="bar-fill ${cls}" style="width:${width}%"></div></div><b>${value}</b></div>`).join('')}</div>`;
    if (type === 'programs') {
      const track = (name,steps) => `<div class="track"><h3>${name}</h3><div class="track-row">${steps.map(([title,text],i)=>`<div class="track-item"><span class="seq">0${i+1}</span><b>${title}</b><small>${text}</small></div>`).join('')}</div></div>`;
      return `${track('취업 트랙 · 4주 / 4단계',[['경험 정리','경험 스케치북<br>직무 역량 키워드'],['서류 완성','이력서·자소서·포트폴리오<br>코멘토 피드백 준비'],['기업 지원','기업 5곳 이상 지원 목표<br>지원 현황 시트'],['면접·입사','면접 답변·비즈니스 매너<br>최종 피드백']])}${track('창업 트랙 · 4주 / 4단계',[['아이템 정의','시장·고객 분석<br>린 캔버스'],['방법 선택','창업 경로 비교<br>실행 계획'],['형태 결정','개인사업자·법인 비교<br>사업 형태 선택'],['실행·회고','사업자등록 또는 모의 실습<br>다음 액션 플랜']])}<p class="sub-note">사업 리서치 프로젝트에서는 참여자 선별·안내, 일일 보고 확인, 주간 발표 자료 취합을 담당했습니다.</p>`;
    }
    if (type === 'proposals') return `<div class="compare"><div><h3>기획 직군을 위한 제안</h3><ul><li>기획·개발 분리 시점과 정원 조정</li><li>기획서 템플릿과 예시 제공</li></ul></div><div><h3>개발 직군을 위한 제안</h3><ul><li>기초반 구현 지원 확대</li><li>익명 팀 모집·장르 선호 사전 공유</li><li>최종 프로젝트 전 회고·건강관리</li></ul></div></div>`;
    return '';
  }

  function figure(image, alt) {
    return `<figure class="article-image"><img src="assets/${image}" alt="${esc(alt)}" loading="lazy"><button class="image-zoom" data-image="${image}" data-caption="${esc(alt)}" aria-label="${esc(alt)} 확대" title="이미지 확대">${icon('expand')}</button><figcaption>${alt}</figcaption></figure>`;
  }

  function extras(p) {
    if (p.extra === 'companies') return `<details class="companies"><summary>공고 연계 기업·이용 플랫폼 56곳</summary><ul class="company-list">${companies.map(c=>`<li>${c}</li>`).join('')}</ul></details>`;
    if (p.extra === 'loadtest') return `<div class="loadtest"><h3>ALB + EC2 2대 구성의 초기 부하 테스트</h3><p>단일 t2.micro와 ALB + t2.micro 2대를 비교했습니다. 같은 테스트에서 초당 요청 수 약 6배를 관측했습니다.</p><div class="table-scroll"><table><caption class="sub-note">wrk -t2 -c10 -d30s / 동시 연결 10 · 30초</caption><thead><tr><th scope="col">측정 항목</th><th scope="col">단일 EC2</th><th scope="col">ALB + EC2 2대</th></tr></thead><tbody><tr><th scope="row">평균 응답시간</th><td>52.12ms</td><td>8.72ms</td></tr><tr><th scope="row">초당 요청 수</th><td>191.18</td><td>1,141.86</td></tr><tr><th scope="row">99백분위 응답시간</th><td>87.96ms</td><td>13.55ms</td></tr></tbody></table></div><p class="sub-note">초기 테스트 결과입니다. 응답 크기에 차이가 있어 동일 응답 조건의 재측정이 필요하며, 인스턴스 비용과 CPU 크레딧도 함께 검토해야 합니다.</p>${figure('bn-single-log.png','단일 EC2 초기 부하 테스트 로그')}${figure('bn-alb-log.png','ALB + EC2 2대 초기 부하 테스트 로그')}</div>`;
    return '';
  }

  function detail(p) {
    const index=projects.indexOf(p), next=projects[(index+1)%projects.length];
    return `<div class="wrap ${p.color}"><header class="detail-hero"><a href="#projects" class="breadcrumb" data-back>${icon('arrow-left')} 프로젝트 목록</a><p class="eyebrow">PROJECT ${p.number} / ${p.category}</p><h1>${p.headline}</h1><p class="detail-sub">${p.name} · ${p.summary}</p><div class="tags">${p.tags.map(t=>`<span class="tag">${t}</span>`).join('')}</div><dl class="detail-info"><div><dt>기간 / 소속</dt><dd>${p.period}<br>${p.org}</dd></div><div><dt>나의 역할</dt><dd>${p.role}</dd></div><div><dt>사용 도구와 기술</dt><dd>${p.tools}</dd></div></dl></header><div class="detail-body"><nav class="toc" aria-label="프로젝트 목차">${[['overview','개요'],['problem','문제 정의'],['process','해결 과정'],['result','결과와 배움']].map(([id,label],i)=>`<a href="#/project/${p.id}/${id}" data-section="${id}"><span>0${i+1}</span>${label}</a>`).join('')}</nav><article class="article"><section id="overview"><div class="section-number">01 / OVERVIEW</div><h2>${p.overview}</h2><p class="lead">${p.intro}</p>${p.facts?`<div class="facts">${p.facts.map(([value,label,note])=>`<div class="fact"><strong>${value}</strong><b>${label}</b><span>${note}</span></div>`).join('')}</div>`:''}${p.image?figure(p.image,p.imageAlt):''}${p.repo?`<a href="${p.repo}" target="_blank" rel="noreferrer" class="text-link">GitHub 저장소 ${icon('arrow-up-right')}</a>`:''}</section><section id="problem"><div class="section-number">02 / PROBLEM</div><h2>${p.problemTitle}</h2><p>${p.problem}</p>${diagram(p.problemVisual)}</section><section id="process"><div class="section-number">03 / PROCESS</div><h2>문제에서 실행으로 옮긴 과정</h2><ol class="process-steps">${p.steps.map(([title,body],i)=>`<li><span class="step-number">0${i+1}</span><div><h3>${title}</h3><p>${body}</p></div></li>`).join('')}</ol>${diagram(p.processVisual)}</section><section id="result"><div class="section-number">04 / RESULT</div><h2>${p.resultTitle}</h2><p>${p.result}</p><div class="result-grid ${p.results.length===4?'four':''}">${p.results.map(([v,l])=>`<div class="result-metric"><strong>${v}</strong><span>${l}</span></div>`).join('')}</div>${p.resultNote?`<p class="sub-note">${p.resultNote}</p>`:''}${extras(p)}<blockquote>${p.reflection}</blockquote></section></article></div><div class="next-project"><p><a class="text-link" href="#projects">${icon('arrow-left')} 모든 프로젝트</a></p><a href="#/project/${next.id}"><div><span>NEXT PROJECT</span><strong>${next.name}</strong></div>${icon('arrow-right')}</a></div></div>`;
  }

  function activateToc() {
    observer?.disconnect();
    const sections = [...document.querySelectorAll('.article>section')];
    if (!sections.length) return;
    const setActive=id=>document.querySelectorAll('.toc a').forEach(a=>{
      a.classList.toggle('active',a.dataset.section===id);
      if(a.dataset.section===id) a.setAttribute('aria-current','location'); else a.removeAttribute('aria-current');
    });
    setActive('overview');
    observer = new IntersectionObserver(entries=>{
      const visible=entries.filter(e=>e.isIntersecting);
      if(visible.length) setActive(visible[0].target.id);
    },{rootMargin:'-20% 0px -55% 0px',threshold:0});
    sections.forEach(s=>observer.observe(s));
  }

  function route() {
    const match=location.hash.match(/^#\/project\/([^/]+)(?:\/([^/]+))?$/);
    const routeId=match?match[1]:'home';
    const changed=routeId!==currentRoute;
    if(changed) {
      dialog.close();
      observer?.disconnect();
      const project=projects.find(p=>p.id===routeId);
      main.innerHTML=routeId==='home'?home():project?detail(project):'<div class="not-found"><h1>프로젝트를 찾을 수 없습니다.</h1><a href="#projects">프로젝트 목록으로 돌아가기</a></div>';
      document.documentElement.classList.toggle('portfolio-home',routeId==='home');
      document.title=project?`${project.name} | 이빛나 포트폴리오`:'이빛나 | 교육 운영과 개발을 연결합니다';
      currentRoute=routeId;
      window.lucide?.createIcons({attrs:{'stroke-width':1.6}});
      activateToc();
      if(routeId!=='home') lastProject=routeId;
      main.focus({preventScroll:true});
    }
    requestAnimationFrame(()=>{
      const section=match?.[2];
      const id=match?section:location.hash.slice(1);
      const target=id&&document.getElementById(id);
      if(target) target.scrollIntoView({behavior:'instant',block:'start'});
      else if(changed) window.scrollTo({top:0,behavior:'instant'});
      if(!match&&changed&&lastProject&&(id==='projects'||!id)) {
        const card=document.getElementById(`card-${lastProject}`);
        document.getElementById(`panel-${lastProject}`)?.scrollIntoView({behavior:'instant',block:'start'});
        card?.focus({preventScroll:true});
      }
    });
  }
  window.addEventListener('hashchange',route);
  document.querySelector('.skip-link').addEventListener('click',event=>{
    event.preventDefault();main.focus({preventScroll:true});window.scrollTo({top:0,behavior:'instant'});
  });
  document.addEventListener('click',event=>{
    const button=event.target.closest('[data-image]');
    if(!button) return;
    const img=document.querySelector('#viewer-image');
    img.src=`assets/${button.dataset.image}`; img.alt=button.dataset.caption;
    document.querySelector('#image-caption').textContent=button.dataset.caption;
    dialog.showModal();document.body.classList.add('dialog-open');
  });
  document.querySelector('#close-viewer').addEventListener('click',()=>dialog.close());
  dialog.addEventListener('click',e=>{if(e.target===dialog){const b=dialog.getBoundingClientRect();if(e.clientX<b.left||e.clientX>b.right||e.clientY<b.top||e.clientY>b.bottom)dialog.close();}});
  dialog.addEventListener('close',()=>document.body.classList.remove('dialog-open'));
  route();
})();
