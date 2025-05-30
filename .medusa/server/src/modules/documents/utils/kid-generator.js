"use strict";
/*
 * Copyright 2024 RSC-Labs, https://rsoftcon.com/
 *
 * MIT License
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.kidForOrder = void 0;
const kidForOrder = (orderId, pattern = "#########") => {
    const digits = orderId.replace(/\D/g, "").slice(-pattern.length + 1);
    // Mod-11 check digit
    const weights = [2, 3, 4, 5, 6, 7];
    const sum = digits
        .split("")
        .reverse()
        .reduce((acc, d, i) => acc + Number(d) * weights[i % 6], 0);
    const remainder = sum % 11;
    const check = remainder === 0 ? 0 : 11 - remainder;
    return digits + check;
};
exports.kidForOrder = kidForOrder;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoia2lkLWdlbmVyYXRvci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3NyYy9tb2R1bGVzL2RvY3VtZW50cy91dGlscy9raWQtZ2VuZXJhdG9yLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQTs7Ozs7Ozs7OztHQVVHOzs7QUFFSSxNQUFNLFdBQVcsR0FBRyxDQUFDLE9BQWUsRUFBRSxPQUFPLEdBQUcsV0FBVyxFQUFFLEVBQUU7SUFDbEUsTUFBTSxNQUFNLEdBQUcsT0FBTyxDQUFDLE9BQU8sQ0FBQyxLQUFLLEVBQUUsRUFBRSxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsT0FBTyxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsQ0FBQztJQUNyRSxxQkFBcUI7SUFDckIsTUFBTSxPQUFPLEdBQUcsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO0lBQ25DLE1BQU0sR0FBRyxHQUFHLE1BQU07U0FDYixLQUFLLENBQUMsRUFBRSxDQUFDO1NBQ1QsT0FBTyxFQUFFO1NBQ1QsTUFBTSxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsRUFBRSxDQUFDLEdBQUcsR0FBRyxNQUFNLENBQUMsQ0FBQyxDQUFDLEdBQUcsT0FBTyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztJQUNoRSxNQUFNLFNBQVMsR0FBRyxHQUFHLEdBQUcsRUFBRSxDQUFDO0lBQzNCLE1BQU0sS0FBSyxHQUFHLFNBQVMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxHQUFHLFNBQVMsQ0FBQztJQUNuRCxPQUFPLE1BQU0sR0FBRyxLQUFLLENBQUM7QUFDMUIsQ0FBQyxDQUFDO0FBWFcsUUFBQSxXQUFXLGVBV3RCIn0=