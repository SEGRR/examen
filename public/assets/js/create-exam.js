
var currentquestion = 2;
function addQuestion(){
    let parent = document.getElementById(`question${currentquestion}`);
  
    
    parent.innerHTML = parent.innerHTML + `<div
    class="px-4 py-3 mb-8 bg-white rounded-lg shadow-md dark:bg-gray-800"
  >
    <label class="block text-sm">
      <span class="text-gray-900 dark:text-gray-300">Question</span>
      <textarea
        class="block w-full mt-1 text-sm dark:text-gray-300 dark:border-gray-600 dark:bg-gray-700 form-textarea focus:border-purple-400 focus:outline-none focus:shadow-outline-purple dark:focus:shadow-outline-gray"
        rows="2"
        name="exam[questions][question_${currentquestion}][text]"
      ></textarea>
    </label>

    <label
      class="mt-4 block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
      for="user_avatar"
      >Upload Image</label
    >
    <input
      class="block w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 cursor-pointer dark:text-gray-400 focus:outline-none focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
      aria-describedby="user_avatar_help"
      id="user_avatar"
      type="file"
      name="exam[questions][question_${currentquestion}][img]"
    />
    <div
      class="mt-1 text-sm text-gray-500 dark:text-gray-300"
      id="user_avatar_help"
    >
      Not a required field
    </div>

    <div class="mt-4 text-sm">
      <span class="text-gray-700 dark:text-gray-400"> Options </span>
      <div class="mt-2 flex-col">
        <div>
          <label
            class="inline-flex items-center text-gray-600 dark:text-gray-400"
          >
            <input
              type="radio"
              class="text-purple-600 form-radio focus:border-purple-400 focus:outline-none focus:shadow-outline-purple dark:focus:shadow-outline-gray"
        
              value="1"
              name="exam[questions][question_${currentquestion}][answer]"
            />
            <span class="ml-2"
              ><input
                type="text"
                id="option-1"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                required
                name="exam[questions][question_${currentquestion}][options][option_1]"
            /></span>
          </label>
        </div>
        <div>
          <label
            class="inline-flex items-center text-gray-600 dark:text-gray-400"
          >
            <input
              type="radio"
              class="text-purple-600 form-radio focus:border-purple-400 focus:outline-none focus:shadow-outline-purple dark:focus:shadow-outline-gray"
              
              value="2"
              name="exam[questions][question_${currentquestion}][answer]"
            />
            <span class="ml-2"
              ><input
                type="text"
                id="option-2"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                required
                name="exam[questions][question_${currentquestion}][options][option_2]"
            /></span>
          </label>
        </div>
        <div>
          <label
            class="inline-flex items-center text-gray-600 dark:text-gray-400"
          >
            <input
              type="radio"
              class="text-purple-600 form-radio focus:border-purple-400 focus:outline-none focus:shadow-outline-purple dark:focus:shadow-outline-gray"
            
              value="3"
              name="exam[questions][question_${currentquestion}][answer]"
            />
            <span class="ml-2"
              ><input
                type="text"
                id="option-3"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                required
                name="exam[questions][question_${currentquestion}][options][option_3]"
            /></span>
          </label>
        </div>
        <div>
          <label
            class="inline-flex items-center text-gray-600 dark:text-gray-400"
          >
            <input
              type="radio"
              class="text-purple-600 form-radio focus:border-purple-400 focus:outline-none focus:shadow-outline-purple dark:focus:shadow-outline-gray"
             
              value="4"
              name="exam[questions][question_${currentquestion}][answer]"
            />
            <span class="ml-2"
              ><input
                type="text"
                id="option-4"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                required
                name="exam[questions][question_${currentquestion}][options][option_4]"
            /></span>
          </label>
        </div>
      </div>
    </div>
  </div>
  <div id="question${currentquestion +1 }"></div>`;

  currentquestion++;
}