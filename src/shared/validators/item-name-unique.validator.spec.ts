import { ItemNameUniqueConstraint } from './item-name-unique.validator';

describe('ItemNameUniqueConstraint', () => {
  it('should be defined', () => {
    expect(new ItemNameUniqueConstraint()).toBeDefined();
  });
});
