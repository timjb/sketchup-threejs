module ExportThreeJS

  # ArraySet
  # ========
  #
  # This is a kind of crossover between sets and arrays. It has only two methods:
  #
  # * push -- adds a value to the ArraySet if the array set doesn't include
  #           it already and returns the index of that value
  # * to_a -- converts the ArraySet to a real array
  #
  # Example:
  #
  #   as = ArraySet.new
  #   as.push 1 # => 0
  #   as.push 4 # => 1
  #   as.push 1 # => 0
  #   as.push 5 # => 2
  #   as.to_a # => [1,4,5]

  class ArraySet
    def initialize
      @hash = Hash.new
      @array = []
    end

    def push o
      if @hash.include? o
        @hash[o]
      else
        i = @array.size
        @array.push o
        @hash[o] = i
        i
      end
    end

    def to_a
      @array
    end
  end

end
