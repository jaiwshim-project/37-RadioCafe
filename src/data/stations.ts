export interface RadioStation {
    id: string;
    name: string;
    url: string;
    freq: string;
    color: string;
    logoText: string;
    provider: string;
}

export const STATIONS: RadioStation[] = [
    {
        id: 'ebs-fm',
        name: 'EBS FM',
        url: 'https://ebsonair.ebs.co.kr/fmradiofamilypc/familypc1m/playlist.m3u8',
        freq: '104.5 MHz',
        color: '#0057b7',
        logoText: 'EBS',
        provider: 'EBS'
    },
    {
        id: 'cbs-music',
        name: 'CBS 음악FM',
        url: 'https://m-aac.cbs.co.kr/mweb_cbs939/_definst_/cbs939.stream/playlist.m3u8',
        freq: '93.9 MHz',
        color: '#1a73e8',
        logoText: 'M',
        provider: 'CBS'
    },
    {
        id: 'kbs-1fm',
        name: 'KBS 1FM (클래식FM)',
        url: 'https://1fm.gscdn.kbs.co.kr/1fm_192_2.m3u8?Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cHM6Ly8xZm0uZ3NjZG4ua2JzLmNvLmtyLyoiLCJDb25kaXRpb24iOnsiRGF0ZUxlc3NUaGFuIjp7IkFXUzpFcG9jaFRpbWUiOjE3Njc4Mjc3NjB9fX1dfQ__&Key-Pair-Id=APKAICDSGT3Y7IXGJ3TA&Signature=mXsMdZtv5pVJjKsZawW0ms8KkzrfYXBgWpi4HtpZO9TKLhUg22n6XIZkLrz2C4HftzhtPbG1vyByHlwHMzMlwXeXwjaxMkU4PNj2Wy-ubyRr8uP2zw41~8ZSCCGF5EV2OFhG1XH-88dD0nWrbSaUsij0SgZREDvrofiA6ip4xha4ZUAwH4vhP7GenNaJXu99DlZYuMfx5o7errctTKY-U6gppCruRl00NCpaOwJTVrwKVc5RnZSs2goGc~uqY8OQZuRwcp1cFTkqCt83FMlIiMKXItPvj8S8x2knhY4cXv1uAyTdKbmHEKTU-lfZVXzmq~NNf5Z0XUC7kLSe90dY3Q__',
        freq: '93.1 MHz',
        color: '#ffdd00',
        logoText: '1',
        provider: 'KBS'
    },
    {
        id: 'gwangju-mbc-fm',
        name: '광주 MBC 음악FM',
        url: 'https://media.kjmbc.co.kr/hls/fmlive/GWANGJU-MBC-FM/playlist.m3u8',
        freq: '93.9 MHz',
        color: '#00a0e9',
        logoText: 'MBC',
        provider: 'MBC'
    },
    {
        id: 'sbs-powerfm',
        name: 'SBS 파워FM',
        url: 'https://radiolive.sbs.co.kr/powerpc/powerfm.stream/playlist.m3u8?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE3Njc2OTc5ODksInBhdGgiOiIvcG93ZXJmbS5zdHJlYW0iLCJkdXJhdGlvbiI6LTEsInVubyI6IjNlZjRmZDA1LTZiYWQtNGYwOC1hMzYzLTBjNjkxMjUyZTEyNiIsImlhdCI6MTc2NzY1NDc4OX0.R-HyadR3JwB4rXJwXBqP33GX4RslvtM0dHb92hBHjo4',
        freq: '107.7 MHz',
        color: '#ff0000',
        logoText: 'SBS',
        provider: 'SBS'
    },
    {
        id: 'tbs-fm',
        name: 'TBS FM',
        url: 'https://cdnfm.tbs.seoul.kr/tbs/_definst_/tbs_fm_web_360.smil/playlist.m3u8',
        freq: '95.1 MHz',
        color: '#ffcc00',
        logoText: 'TBS',
        provider: 'TBS'
    }
];
