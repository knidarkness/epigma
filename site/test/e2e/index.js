import Nightmare from 'nightmare';

describe('test duckduckgo search results', () => {
    it('should find the nightmare github link first', function(done) {
        this.timeout('20s');

        const nightmare = Nightmare();
        nightmare
            .goto('http://prod.dassurance.io')
            .viewport(1920, 1080)
            .screenshot('./test/e2e/screenshots/test.jpg')
            .wait('.document-list')
            .evaluate(() => {
                document.querySelector('.document-list__item a').click();
            })
            .end()
            .wait('#canvas')
            .screenshot('./test/e2e/screenshots/test1.jpg')
            .then(() => {
                done()
            })
    })
});