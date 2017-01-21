import { TeradataPage } from './app.po';

describe('teradata App', function() {
  let page: TeradataPage;

  beforeEach(() => {
    page = new TeradataPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
