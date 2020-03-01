$(function () {
  $(".change-devoured").on("click", function (event) {
    const id = $(this).data("id");
    const newDevour = $(this).data("newdevour");

    const newDevourState = {
      devoured: newDevour
    };

    $.ajax("/api/burgers/" + id, {
      type: "PUT",
      data: newDevourState
    }).then(
      function () {
        console.log("changed to", newDevour);
        location.reload();
      }
    );
  });

  $(".create-form").on("submit", function (event) {
    event.preventDefault();
    const newBurger = {
      burger_name: $("#ca").val().trim(),
    };

    $.ajax("/api/burgers", {
      type: "POST",
      data: newBurger
    }).then(
      function () {
        console.log("created new cat");
        location.reload();
      }
    );
  });

  // $(".delete-cat").on("click", function (event) {
  //   const id = $(this).data("id");

  //   $.ajax("/api/burgers/" + id, {
  //     type: "DELETE"
  //   }).then(
  //     function () {
  //       console.log("deleted cat", id);
  //       location.reload();
  //     }
  //   );
  // });
});
