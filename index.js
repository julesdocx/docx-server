document.addEventListener("DOMContentLoaded", function () {
      const circle = document.getElementById("circle");
      let isRotating = false;
      let totalTurns = 0;
      let count = 8;
      let sizeAmplitude = 2;
      let sizeAddition = 3;
      const circleDivider = 1 / count;
      let circleRadius = 200;

      const images = [
        "https://d2w9rnfcy7mm78.cloudfront.net/32470621/original_0f244c1ed237070c0e24d2dfabc91be5.png?1732431943?bc=0",
        "https://d2w9rnfcy7mm78.cloudfront.net/32470619/original_d025edfa1302a87d10bdb214d56bcdcd.png?1732431936?bc=0",
        "https://d2w9rnfcy7mm78.cloudfront.net/32470617/original_6daef027b212be5d4e75102c0056133d.png?1732431932?bc=0",
        "https://d2w9rnfcy7mm78.cloudfront.net/32470616/original_5ecb00023cf63e7e28f45a6a1728dd22.png?1732431929?bc=0",
        "https://d2w9rnfcy7mm78.cloudfront.net/32470611/original_e9538b47d6a6abe992b2a674ef96251c.png?1732431925?bc=0",
        "https://d2w9rnfcy7mm78.cloudfront.net/32470608/original_475fd159f10d9373bace12e94eab2045.png?1732431923?bc=0",
        "https://d2w9rnfcy7mm78.cloudfront.net/32470607/original_a329b768292eb3294073a958ee67429e.png?1732431920?bc=0",
        "https://d2w9rnfcy7mm78.cloudfront.net/32470606/original_3c8caf3b7f2c1582a67c4fd875e665a8.png?1732431917?bc=0",
      ]

      function rotateItems(turnsToRotate) {
        const items = document.querySelectorAll('.item');
        let rotationsCompleted = 0;

        function handleTransitionEnd() {
          rotationsCompleted++;
          if (rotationsCompleted === items.length) {
            isRotating = false;
            document.body.classList.remove('is-rotating');
          }
        }

        document.body.classList.add('is-rotating');

        items.forEach((item, index) => {
            item.addEventListener('transitionend', handleTransitionEnd);
            const rotationDirection = (turnsToRotate > 0) ? 1 : -1;
            const counterRotationDirection = (turnsToRotate > 0) ? -1 : 1;

            // Calculate the target rotation based on turnsToRotate
            const targetRotation = (index+1) * circleDivider + turnsToRotate ;
            item.style.transform = `rotate(${targetRotation}turn) translateX(${circleRadius}px)`;
            const scaleFactor = sizeAddition + sizeAmplitude * Math.sin(targetRotation * 360 / 180 * Math.PI);
            const contentRotation = (-circleDivider * (index + 1) - turnsToRotate);
            item.querySelector('.content').style.transform = `rotateX(-30deg) rotate(${contentRotation}turn) scale(${scaleFactor})`;
        });


        setTimeout(() => {
          isRotating = false;
          document.body.classList.remove('is-rotating');
        }, 200);
      }

        function handleClick(event) {
            if (!isRotating) {
                const clickedIndex = Array.from(circle.children).indexOf(event.currentTarget);
                const turnsToRotate = circleDivider - circleDivider * (clickedIndex);
                isRotating = true;
                rotateItems(turnsToRotate);
                totalTurns = turnsToRotate;
            }
        }

      for (let i = 1; i <= count; i++) {
        const item = document.createElement("div");
        item.className = "item";

        const initialRotation = circleDivider * (i);
        item.style.transform = `rotate(${initialRotation}turn) translateX(${circleRadius  }px)`;

        const content = document.createElement("div");
        content.className = "content";
        const scaleFactor = sizeAddition + sizeAmplitude * Math.sin((i ) * circleDivider * 360 / 180 * Math.PI);
        content.style.transform = `rotateX(-30deg) rotate(${-circleDivider * (i )}turn) scale(${scaleFactor})`;

        const img = document.createElement("img");
        img.src = `${images[i-1]}`;
        img.style.width = "30px";
        img.style.height = "30px";

        const blurImg = document.createElement("img");
        blurImg.src = `${images[i-1]}`;
        blurImg.style.width = "30px";
        blurImg.style.height = "30px";
        blurImg.className = "blur-image";

        content.appendChild(img);
        content.appendChild(blurImg);
        item.appendChild(content);
        circle.appendChild(item);

        // Add click event listener to each item
        item.addEventListener('click', handleClick);
      }

      function debounce(func, delay) {
        let timeout;
        return function () {
          const context = this;
          const args = arguments;
          clearTimeout(timeout);
          timeout = setTimeout(() => func.apply(context, args), delay);
        };
      }

      window.rotateClockwise = debounce(function () {
        if (!isRotating) {
          isRotating = true;
          rotateItems(totalTurns + circleDivider);
          totalTurns += circleDivider;
        }
      }, 500);

      window.rotateCounterClockwise = debounce(function () {
        if (!isRotating) {
          isRotating = true;
          rotateItems(totalTurns - circleDivider);
          totalTurns -= circleDivider;
        }
      }, 500);
    });