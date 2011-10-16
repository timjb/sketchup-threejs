require 'test/unit'

require 'array_set.rb'

class TestArraySet < Test::Unit::TestCase

  def test_push
    as = ExportThreeJS::ArraySet.new
    assert_equal(as.push(42), 0)
    assert_equal(as.push(42), 0)
    assert_equal(as.push(23), 1)
    assert_equal(as.push(42), 0)
    assert_equal(as.push(0), 2)
    assert_equal(as.push(23), 1)
  end

  def test_to_a
    as = ExportThreeJS::ArraySet.new
    as.push(5)
    as.push(4)
    as.push(3)
    as.push(5)
    assert_equal(as.to_a, [5,4,3])
  end

end
