import { DataQualityModule } from './data-quality.module';

describe('DataQualityModule', () => {
  let dataQualityModule: DataQualityModule;

  beforeEach(() => {
    dataQualityModule = new DataQualityModule();
  });

  it('should create an instance', () => {
    expect(dataQualityModule).toBeTruthy();
  });
});
