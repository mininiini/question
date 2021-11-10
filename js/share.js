function kakaoshare(){
    Kakao.Link.sendDefault({
    objectType: 'feed',
    content: {
    title: '설문조사',
    description: '설문조사 ',
    imageUrl:
        './img/sun.png',
    link: {
        mobileWebUrl: 'https://developers.kakao.com',
        androidExecutionParams: 'test',
    },
    buttons: [
    {
        title: '웹으로 이동',
        link: {
        mobileWebUrl: 'https://developers.kakao.com',
        }
    }
    ]
    }
    });
    }